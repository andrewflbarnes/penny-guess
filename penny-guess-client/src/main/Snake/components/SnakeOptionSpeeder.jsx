import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  speed: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

export default function SnakeOptionSpeeder({ speed, onIncrement, onDecrement }) {
  return (
    <div>
      <div className="row mb-3" />
      <div className="input-group col-6 offset-3 justify-content-between">
        <div className="input-group-prepend">
          <button onClick={onDecrement} type="button" className="btn btn-secondary mr-2">-</button>
          <div className="input-group-text" id="speedPrepend">Speed</div>
        </div>
        <input type="text" className="form-control" placeholder="Your name" disabled
               aria-label="Speed Input" aria-describedby="speedPrepend" value={speed}/>
        <div className="input-group-append">
          <button onClick={onIncrement} type="button" className="btn btn-secondary ml-2">+</button>
        </div>
      </div>
    </div>
  )
}

SnakeOptionSpeeder.propTypes = propTypes;
