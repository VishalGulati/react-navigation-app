import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';

const Message = (props) => {
    const { message } = props;
    return (
        message ? <p className={props.messageType === 'error' ? "text-red" : ''}>
            {message}
        </p> : null
    );
}

Message.propTypes = {
    message: PropTypes.string,
    messageType: PropTypes.string
};

export default Message;