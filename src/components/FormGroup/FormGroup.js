import React from 'react';
import PropTypes from 'prop-types';
import AutoCompleteInput from '../../containers/AutoCompleteInput/AutoCompleteInput';

/**
 * A re-usable comonent that returns a combination of label and an input field 
 * collectively called form group
 */
const FormGroup = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.inputId}>{props.label}</label>
      <AutoCompleteInput inputId={props.inputId} />
    </div>
  );
};

FormGroup.propTypes = {
  inputId: PropTypes.string,
  label: PropTypes.string
};

export default FormGroup;
