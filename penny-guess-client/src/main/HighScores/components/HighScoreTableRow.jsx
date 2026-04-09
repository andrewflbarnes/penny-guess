import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  user: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default function HighScoreTableRow({ user, score }) {
  return (
    <tr>
      <td className="w-50">{user}</td>
      <td className="w-50">{score}</td>
    </tr>
  )
}

HighScoreTableRow.propTypes = propTypes;
