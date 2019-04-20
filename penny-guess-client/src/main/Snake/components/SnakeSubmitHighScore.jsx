import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  score: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default function SnakeSubmitHighScore({onSubmit, onCancel, onChange, score}) {
  return (
    <div>
      <div className="row mb-3" />
      <h3>You died and scored {score} points!</h3>
      <div className="col-6 offset-3">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text" id="inputNamePrepend">Name</div>
              </div>
              <input onChange={onChange} type="text" className="form-control" placeholder="Your name"
                     aria-label="Name Input" aria-describedby="inputNamePrepend"/>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary col-5 mr-2" value="Submit score"/>
            <input type="button" onClick={onCancel} className="btn btn-primary col-5 mr-2" value="Cancel"/>
          </div>
        </form>
      </div>
    </div>
  );
}

SnakeSubmitHighScore.propTypes = propTypes;
