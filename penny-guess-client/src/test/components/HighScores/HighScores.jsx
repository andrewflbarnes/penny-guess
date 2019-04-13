import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import chai, {expect} from 'chai';
import fetchMock from 'fetch-mock';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import chaiFetchMock from 'chai-fetch-mock';
import Adapter from 'enzyme-adapter-react-16';
import HighScores from "../../../main/components/HighScores/HighScores";
import HighScoreTable from "../../../main/components/HighScores/HighScoreTable";

configure({ adapter: new Adapter() });

function waitFor(waitFunction, message, timeout = 1000) {
  let timedout = false;
  const timer = setTimeout(() => {
    // FIXME - this isn't getting called for some reason
    timedout = true;
  }, timeout);

  while (!waitFunction && !timedout) {
    // keep waiting!
  }
  clearTimeout(timer);

  if (timedout) {
    expect.fail(message || 'Timeout while waiting for async render operation');
  }
}

describe('HighScores Component', () => {

  chai.should();
  chai.use(chaiAsPromised);
  chai.use(chaiFetchMock);
  chai.use(chaiEnzyme());

  const expectedHighScores = [{'name': 'Andrew', 'score': 1000}];

  before(() => {
    fetchMock.get('/api/scores/high', expectedHighScores);
  });

  it('renders main message', () => {
    const wrapper = shallow(<HighScores />);
    const title = <h1>High Scores</h1>;

    waitFor(fetchMock.called, 'Fetch was not called');

    expect(wrapper).to.contain(title);
  });

  it('contains HighScoreTable child with fetched data', async () => {
    const wrapper =  mount(<HighScores />);

    waitFor(fetchMock.called, 'Fetch was not called');

    const highScoreTable = wrapper.find(HighScoreTable);
    expect(highScoreTable.length).to.equal(1);
    expect(highScoreTable.props()).to.deep.equal(expectedHighScores);
    expect(fetchMock.called()).to.equal(true);
  });

  after(() => {
    fetchMock.restore();
  })

});
