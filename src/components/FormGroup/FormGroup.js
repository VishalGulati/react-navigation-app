import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.inputId}>{props.label}</label>
            <input type="text" 
                className="form-control" 
                id={props.inputId}
                value={props.value} 
                onChange={props.handleChange} 
                required />
        </div>
    );
}

FormGroup.propTypes = {
    inputId: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func
};

export default FormGroup;