import React from 'react';
import { Provider } from 'react-redux';

import EditableTitle from './EditableTitle';
import FormulaEditor from './FormulaEditor';
import FormulaResult from './FormulaResult';
import reduxStore from './store';
import './App.css';


function App() {
  return (
    <Provider store={reduxStore}>
      <div className="App">
        <header>
          <EditableTitle />
        </header>

        <div className="App-formula">
          <div>
            <span>Formula</span>
            <span><FormulaEditor /></span>
          </div>
          <div>
            <span>Result</span>
            <span><FormulaResult /></span>
          </div>
        </div>
        <br/>
        <br/>
        <footer>
          <em>Note: This application stores everything in the URL.
          <br/>
          You can share the current state of this this page by sharing the url.</em>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
