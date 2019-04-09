import React from 'react';
import PropTypes from 'prop-types';

const HighScoreTable = (props) => {
  return (
    <table className="table">
      <tbody>
      {props.highScores.map((hs, i) => (
        <tr key={`high_score_${i}`}>
          <td>{hs.name}</td>
          <td>{hs.score}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
};

HighScoreTable.propTypes = {
  highScores: PropTypes.array.isRequired,
};

export default HighScoreTable;
