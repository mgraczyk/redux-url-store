import React from 'react';
import { connect } from 'react-redux';

import { setFormula } from './actions';

const FormulaEditor = (props) => (
  <input
    type="text"
    value={props.formula}
    placeholder="Type Formula..."
    onChange={evt => props.setFormula(evt.target.value)}
    />
);

const wrapFormulaEditor = connect(
  state => ({ formula: state.formula }),
  { setFormula },
);

export default wrapFormulaEditor(FormulaEditor);
