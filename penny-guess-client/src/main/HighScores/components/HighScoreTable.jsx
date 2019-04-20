import React from 'react';
import PropTypes from 'prop-types';
import HighScoreTableRow from './HighScoreTableRow';

const propTypes = {
  highScores: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
  status: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    failed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default function HighScoreTable({highScores, status}) {
  let message = '';

  if (status.loading) {
    message = 'Retrieving latest scores...';
  } else if (status.failed) {
    message = 'Failed to load latest scores'
  }

  return (
    <div>
      <h1>High Scores</h1>
      <table className="table">
        <tbody>
        {highScores
          .sort((a, b) => b.score - a.score)
          .map(hs => (
            <HighScoreTableRow key={hs.name} name={hs.name} score={hs.score} />
          ))
        }
        </tbody>
      </table>
      <small>{message}</small>
    </div>
  )
}

HighScoreTable.propTypes = propTypes;
