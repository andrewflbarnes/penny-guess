import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import SnakeOptionSpeeder from "./SnakeOptionSpeeder";
import * as actions from '../action_creators';

const propTypes = {
  pauseSnake: PropTypes.func.isRequired,
  unpauseSnake: PropTypes.func.isRequired,
  updateSnakeSpeed: PropTypes.func.isRequired,
  speed: PropTypes.number.isRequired,
};

export class RawSnakeOptions extends React.Component {
  constructor(props) {
    super(props);

    this.handleSpeedDecrement = this.handleSpeedDecrement.bind(this);
    this.handleSpeedIncrement = this.handleSpeedIncrement.bind(this);
  }

  handleSpeedIncrement() {
    const { speed, updateSnakeSpeed, pauseSnake, unpauseSnake } = this.props;

    updateSnakeSpeed(speed + 1);
    pauseSnake();
    unpauseSnake();
  }

  handleSpeedDecrement() {
    const { speed, updateSnakeSpeed, pauseSnake, unpauseSnake } = this.props;

    updateSnakeSpeed(speed - 1);
    pauseSnake();
    unpauseSnake();
  }

  render() {
    const { speed } = this.props;

    return (
      <div>
        <div className="row mb-3" />
        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseOptions"
                aria-expanded="false" aria-controls="collapseOptions">
          Options
        </button>
        <div className="collapse" id="collapseOptions">
          <SnakeOptionSpeeder onIncrement={this.handleSpeedIncrement} speed={speed} onDecrement={this.handleSpeedDecrement}/>
        </div>
      </div>
    )
  }
}

RawSnakeOptions.propTypes = propTypes;

const mapStateToProps = state => {
  const { speed } = state.snake.game.snakeState;
  return {
    speed,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

const SnakeOptions = connect(mapStateToProps, mapDispatchToProps)(RawSnakeOptions);

export default SnakeOptions;
