import React from 'react';
import PropTypes from 'prop-types';
import HighScoreTableRow from './HighScoreTableRow';

const propTypes = {
  highScores: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
};

export default function HighScoreTable({highScores}) {
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
    </div>
  )
}

HighScoreTable.propTypes = propTypes;
