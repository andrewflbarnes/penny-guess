import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HighScoreTable from './HighScoreTable';
import * as actions from '../action_creators';

const propTypes = {
  highScores: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
  fetchHighScores: PropTypes.func.isRequired
};

export class RawHighScores extends React.Component {

  componentDidMount() {
    const { fetchHighScores } = this.props;
    fetchHighScores();
  }

  render() {
    const { highScores, status } = this.props;

    return (
      <HighScoreTable status={status} highScores={highScores}/>
    )
  }
}

RawHighScores.propTypes = propTypes;

const mapStateToProps = state => {
  const { highScores } = state;
  return {
    highScores: highScores.scores,
    status: highScores.status,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
};

const HighScores = connect(mapStateToProps, mapDispatchToProps)(RawHighScores);

export default HighScores;
