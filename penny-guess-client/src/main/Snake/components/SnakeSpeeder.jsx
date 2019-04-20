import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  speed: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

export default function SnakeSpeeder({ speed, onIncrement, onDecrement }) {
  return (
    <div>
      <div className="row mb-3" />
      <div className="input-group col-4 offset-4 justify-content-between">
        <button onClick={onDecrement} type="button" className="btn btn-secondary ml-0 mr-0">-</button>
        <h3>{speed}</h3>
        <button onClick={onIncrement} type="button" className="btn btn-secondary ml-0 mr-0">+</button>
      </div>
    </div>
  )
}

SnakeSpeeder.propTypes = propTypes;
