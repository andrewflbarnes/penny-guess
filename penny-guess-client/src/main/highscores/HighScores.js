import React from 'react';
import api from '../api';
import HighScoreTable from './HighScoreTable';

export default class HighScores extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      highScores: []
    }
  }

  componentDidMount() {
    api.getHighScores()
      .then(highScores => {
        this.setState({
          highScores
        })
      });
  }

  render() {
    return (
      <div>
        <h1>High Scores</h1>
        <HighScoreTable highScores={this.state.highScores}/>
      </div>
    )
  }
}
