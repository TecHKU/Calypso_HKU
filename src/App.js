import React, { Component } from 'react';
import { BrowserRouter as Router , Route}from 'react-router-dom'
import { Landing } from './pages/pages';
class App extends Component {
  render() {
    return (
        <Router>
            <Route path={'/'} component={Landing}/>
        </Router>
    );
  }
}

export default App;
