import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationsContext from '../../context/locationsContext';
import './AutoCompleteInput.css';

/**
 * A re-usable component that returns a input field that is bound with Google maps API
 */
class AutoCompleteInput extends Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.state = {
      isDirty: false
    };
  }

  static contextType = LocationsContext;

  /**
     * @name handlePlaceChanged
     * @description This method to be execued when customer keys in input in text fields
     */
  handlePlaceChanged = () => {
    const place = this.autocomplete.getPlace();
    if (place && place.geometry) {
      this.context.updateLocation(this.props.inputId, place.geometry.location);
      this.setState({
        isDirty: true
      });
    }
  };

  /**
     * @name resetField
     * @description This method to be execued on click of cross button
     */
  resetField = () => {
    this.autocompleteInput.current.value = '';
    this.context.updateLocation(this.props.inputId, '');
    this.setState({
      isDirty: false
    });
  };

  /**
 * @name componentDidUpdate
 * @description React component lifecycle hook
 */
  componentDidUpdate() {
    if (this.context.resetPending) {
      this.resetField();
    }
  }

  componentDidMount() {
    this.autocomplete = new window.google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ['geocode'] }
    );
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          ref={this.autocompleteInput}
          className="form-control autocomplete-input"
          id={this.props.inputId}
          placeholder="Enter a location"
        />
        {this.state.isDirty && (
          <span className="cross-icon" onClick={this.resetField}>
            X
          </span>
        )}
      </React.Fragment>
    );
  }
}

AutoCompleteInput.propTypes = {
  inputId: PropTypes.string
};

export default AutoCompleteInput;
