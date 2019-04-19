import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  message: PropTypes.string.isRequired,
};

export default function HomeMessage({onClick, message}) {
    return (
      /* eslint jsx-a11y/no-noninteractive-element-interactions: 1 */
      /* eslint jsx-a11y/click-events-have-key-events: 0 */
      <h1 style={{ outline: '0px solid transparent'}}>{message}</h1>
      /* eslint enable */
    );
}

HomeMessage.propTypes = propTypes;
