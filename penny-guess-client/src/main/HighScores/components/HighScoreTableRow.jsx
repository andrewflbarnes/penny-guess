import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default function HighScoreTableRow({ name, score }) {
  return (
    <tr>
      <td class="w-50">{name}</td>
      <td class="w-50">{score}</td>
    </tr>
  )
}

HighScoreTableRow.propTypes = propTypes;
