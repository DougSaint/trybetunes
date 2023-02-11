import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Content from './components/Content';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className="app">
          <Content />
        </div>
      </HashRouter>
    );
  }
}

export default App;
