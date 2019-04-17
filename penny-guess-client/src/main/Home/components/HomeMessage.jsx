import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default function HomeMessage({onClick, message}) {
    return (
      /* eslint jsx-a11y/no-noninteractive-element-interactions: 1 */
      /* eslint jsx-a11y/click-events-have-key-events: 0 */
      <h1 style={{ outline: '0px solid transparent'}}  onClick={onClick}>{message}</h1>
    );
}

HomeMessage.propTypes = propTypes;
