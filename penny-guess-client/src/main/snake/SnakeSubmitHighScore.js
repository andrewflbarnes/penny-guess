import React from 'react';
import PropTypes from 'prop-types';

export const SnakeSubmitHighScore = (props) => {
  return (
    <div className="snake-submit-score">
      <h3>You died and scored {props.score} points!</h3>
      <form onSubmit={props.onSubmit}>
        <div className="form-group row">
          <label htmlFor="snake-submit-score-name">Name</label>
          <input onChange={props.onChange} type="text" placeholder="Name"/>
        </div>
        <div className="form-group row">
          <input type="submit" className="btn btn-primary" value="Submit score" />
        </div>
      </form>
    </div>
  );
};

SnakeSubmitHighScore.propTypes = {
  score: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
