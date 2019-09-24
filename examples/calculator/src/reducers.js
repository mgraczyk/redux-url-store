import { combineReducers } from 'redux';

const initialState = {
  title: '',
  formula: '',
};

const title = (state = initialState.title, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return action.title;
    default:
      return state;
  }
}


const formula = (state = initialState.formula, action) => {
  switch (action.type) {
    case 'SET_FORMULA':
      return action.formula;
    default:
      return state;
  }
}


export default combineReducers({
  title,
  formula,
});
