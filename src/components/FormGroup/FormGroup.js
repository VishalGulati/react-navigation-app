import React from 'react';
import PropTypes from 'prop-types';
import AutoCompleteInput from '../AutoCompleteInput/AutoCompleteInput';

const FormGroup = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.inputId}>{props.label}</label>
            <AutoCompleteInput 
                className="form-control" 
                inputId={props.inputId}
                mapLoaded={props.mapLoaded} />
        </div>
    );
}

FormGroup.propTypes = {
    inputId: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string
};

export default FormGroup;