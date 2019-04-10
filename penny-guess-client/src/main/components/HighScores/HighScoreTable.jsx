import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  highScores: PropTypes.array.isRequired,
};

export default function HighScoreTable({highScores}) {
  return (
    <table className="table">
      <tbody>
      {highScores.map(hs => (
        <tr key={hs.name}>
          <td>{hs.name}</td>
          <td>{hs.score}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

HighScoreTable.propTypes = propTypes;
