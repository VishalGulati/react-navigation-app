import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';

/**
 * A re-usable component that displays the message it receives with approopriate styling 
 * based on the message type
 */
const Message = props => {
  const { message, messageType } = props;
  const createMarkup = message => {
    return { __html: message };
  };
  return message ? (
    <p
      className={messageType === 'error' ? 'text-red' : ''}
      dangerouslySetInnerHTML={createMarkup(message)}
    />
  ) : null;
};

Message.propTypes = {
  message: PropTypes.string,
  messageType: PropTypes.string
};

export default Message;
