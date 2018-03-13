import React, { Component } from 'react';
import { BrowserRouter as Router , Route }from 'react-router-dom'
import Landing from './pages/Landing';
import Login from './pages/Login';
class App extends Component {
  render() {
    return (
        <Router>
            <div className={"container-fluid"}>
                <Route path={'/'} component={Landing}/>
                <Route path={'/login'} component={Login}/>
            </div>
        </Router>
    );
  }
}

export default App;
