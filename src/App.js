import React, { Component } from 'react';
import Homepage from './components/Homepage';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
          <Header/>
          <Homepage/>
      </div>
    );
  }
}

export default App;
