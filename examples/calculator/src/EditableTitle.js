import React from 'react';
import { connect } from 'react-redux';

import { setTitle } from './actions';

const Title = (props) => (
  <input
    className="App-title"
    type="text"
    value={props.title}
    placeholder="Calculation Title..."
    onChange={evt => props.setTitle(evt.target.value)}
    />
);

const wrapTitle = connect(
  state => ({ title: state.title }),
  { setTitle },
);

export default wrapTitle(Title);
