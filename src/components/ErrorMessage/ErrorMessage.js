import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

const ErrorMessage = (props) => {
    const { message } = props;
    return (
        message ? <p className="text-red">
            {message}
        </p> : null
    );
}

ErrorMessage.propTypes = {
    message: PropTypes.string
};

export default ErrorMessage;