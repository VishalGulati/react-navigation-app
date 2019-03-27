import React from 'react';
import './LeftPanel.css';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup/FormGroup';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const LeftPanel = (props) => {
    return (
        <div className="col-xs-12 col-md-4 left-panel">
            <form onSubmit={props.handleSubmit}>
                <FormGroup inputId="start"
                    label="Starting location" />
                <FormGroup inputId="drop"
                    label="Drop-off point" />
                <ErrorMessage message={props.errorMessage} />
                <button type="button" className="btn btn-primary lp-btn" onClick={props.handleSubmit}>
                    Submit
                    </button>
                <button type="button" className="btn btn-secondary lp-btn" onClick={props.handleReset}>
                    Reset
                    </button>
            </form>
        </div>
    );
}


LeftPanel.propTypes = {
    errorMessage: PropTypes.string,
    mapLoaded: PropTypes.bool,
    handleSubmit: PropTypes.func,
    handleReset: PropTypes.func
};

export default LeftPanel;