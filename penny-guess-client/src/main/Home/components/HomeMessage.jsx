import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  message: PropTypes.string.isRequired,
};

export default function HomeMessage({message}) {
    return (
      <h1 style={{ outline: '0px solid transparent'}}>{message}</h1>
    );
}

HomeMessage.propTypes = propTypes;
