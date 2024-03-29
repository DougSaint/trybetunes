import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/Content';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/trybetunes">
        <div className="app">
          <Content />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
