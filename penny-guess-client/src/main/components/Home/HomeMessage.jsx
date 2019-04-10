import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default function HomeMessage({onClick, message}) {
    return (
      <h1 onClick={onClick}>{message}</h1>
    );
}

HomeMessage.propTypes = propTypes;
