import React from 'react';
import { connect } from 'react-redux';

const FormulaResult = (props) => {
  let result = null;
  try {
    result = eval(props.formula);
  } catch (error) {
    console.log(error);
  }

  return '' + (result ? result : '???');
};

const wrapFormulaResult = connect(
  state => ({ formula: state.formula }),
);

export default wrapFormulaResult(FormulaResult);
