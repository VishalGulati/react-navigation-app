import React, { Component } from 'react';
import './LeftPanel.css';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup/FormGroup';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

class LeftPanel extends Component {
    render() {
        return (
            <div className="col-xs-12 col-md-4 left-panel">
                <form onSubmit={this.props.handleSubmit}>
                    <FormGroup inputId="start"
                        label="Starting location"
                        value={this.props.value}
                        handleChange={this.props.handleChange} />
                    <FormGroup inputId="drop"
                        label="Drop-off point"
                        value={this.props.value}
                        handleChange={this.props.handleChange} />
                    <ErrorMessage message={this.props.errorMessage} />
                    <button type="button" className="btn btn-primary lp-btn" onClick={this.props.handleSubmit}>
                        Submit
                    </button>
                    <button type="button" className="btn btn-secondary lp-btn" onClick={this.props.handleReset}>
                        Reset
                    </button>
                </form>
            </div>
        );
    }
}


LeftPanel.propTypes = {
    start: PropTypes.string,
    drop: PropTypes.string,
    errorMessage: PropTypes.string,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleReset: PropTypes.func
};

export default LeftPanel;