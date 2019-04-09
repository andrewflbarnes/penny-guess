import React from 'react';
import PropTypes from 'prop-types';

const HomeMessage = (props) => {
    return (
      <h1 onClick={props.onClick}>{props.message}</h1>
    );
};

HomeMessage.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default HomeMessage;
