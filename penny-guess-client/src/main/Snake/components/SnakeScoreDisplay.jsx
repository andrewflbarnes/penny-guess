import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
};

export default function SnakeScoreDisplay({ score, highScore }) {
  return (
    <div>
      <div className="row mb-3" />
      <h2>Score: {score}</h2>
      <h2>High Score: {highScore}</h2>
    </div>
  )
}

SnakeScoreDisplay.propTypes = propTypes;
