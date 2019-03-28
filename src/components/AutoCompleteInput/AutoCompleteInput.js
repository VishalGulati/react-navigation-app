import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationsContext from '../../context/LocationsContext';

class AutoCompleteInput extends Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
    }

    static contextType = LocationsContext;

    handlePlaceChanged = () => {
        const place = this.autocomplete.getPlace();
        console.log(JSON.stringify(place.geometry.location));
        this.context.updateLocation(this.props.inputId, place.geometry.location)
    }

    componentDidUpdate() {
        if (this.context.mapLoaded) {
            this.autocomplete = new window.google.maps.places.Autocomplete(
                this.autocompleteInput.current,
                { types: ["geocode"] }
            );
            this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
        }
    }

    render() {
        console.log('re-render')
        //const value = this.context[this.props.inputId];
        //console.log('value is : ', value)
        return (
            <input type="text"
                ref={this.autocompleteInput}
                className="form-control"
                id={this.props.inputId}
                placeholder="Enter a location" />
        );
    }
}

AutoCompleteInput.propTypes = {
    inputId: PropTypes.string,
    value: PropTypes.string
};

export default AutoCompleteInput;