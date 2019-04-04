import React, { Component } from 'react';
import './SearchForm.css';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup/FormGroup';
import Message from '../Message/Message';

/**
 * The Left panel of the application that contains the search form.
 */
class SearchForm extends Component {
  /**
 * @name componentDidUpdate
 * @description React component lifecycle hook
 */
  componentDidUpdate() {
    if (this.props.resetPending) {
      this.myFormRef.reset();
      this.props.resetDone();
    }
  }

  /**
     * @name getBtnLabel
     * @description This method returns the label to be displayed on submit button, by default its Submit,
     * once form submitted, it will be Re-Submit and during API request it will be Loading...
     */
  getBtnLabel = () => {
    if (this.props.isLoading) {
      return 'Loading...';
    } else if (this.props.isDirty) {
      return 'Re-Submit';
    } else {
      return 'Submit';
    }
  };

  render() {
    return (
      <div className="col-xs-12 col-md-4 left-panel">
        <form
          onSubmit={this.props.handleSubmit}
          ref={el => (this.myFormRef = el)}
        >
          <FormGroup inputId="start" label="Starting location" />
          <FormGroup inputId="drop" label="Drop-off point" />
          <Message
            message={this.props.message}
            messageType={this.props.messageType}
          />
          <button
            type="button"
            className="btn btn-primary lp-btn"
            disabled={this.props.isLoading}
            onClick={this.props.handleSubmit}
          >
            {this.getBtnLabel()}
          </button>
          <button
            type="button"
            className="btn btn-secondary lp-btn"
            onClick={this.props.handleReset}
          >
            Reset
          </button>
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  message: PropTypes.string,
  messageType: PropTypes.string,
  isLoading: PropTypes.bool,
  isDirty: PropTypes.bool,
  mapLoaded: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleReset: PropTypes.func,
  resetDone: PropTypes.func,
  resetPending: PropTypes.bool
};

export default SearchForm;
