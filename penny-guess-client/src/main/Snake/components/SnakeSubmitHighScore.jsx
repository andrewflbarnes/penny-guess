import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  score: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default function SnakeSubmitHighScore({onSubmit, onChange, score}) {
  return (
    <div>
      <h3>You died and scored {score} points!</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="snake-submit-high-score">
            Name
            <input id="snake-submit-high-score" onChange={onChange} type="text" placeholder="Name"/>
          </label>
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Submit score" />
        </div>
      </form>
    </div>
  );
}

SnakeSubmitHighScore.propTypes = propTypes;
