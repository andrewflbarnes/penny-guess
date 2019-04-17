import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  highScores: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
};

export default function HighScoreTable({highScores}) {
  return (
    <table className="table">
      <tbody>
      {highScores
        .sort((a, b) => b.score - a.score)
        .map(hs => (
          <tr key={hs.name}>
            <td>{hs.name}</td>
            <td>{hs.score}</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  )
}

HighScoreTable.propTypes = propTypes;
