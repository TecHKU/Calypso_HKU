import React, { Component } from 'react';
import { BrowserRouter as Router , Route }from 'react-router-dom'
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NewProject from './pages/NewProject';
import MyProfile from './pages/MyProfile';
import YouHaveBeenLoggedOut from './pages/YouHaveBeenLoggedOut';

import { MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import {blue, grey} from '@material-ui/core/colors';

const myTheme = createMuiTheme({
    palette: {
        primary1Color: blue[400],
        primary2Color: grey[600],
        textColor: grey[900],
        borderColor: grey[300],
        shadowColor: grey[900]
    }
});

class App extends Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={myTheme}>
                <Router>
                    <div className={"container-fluid"}>
                        <Route exact={true} path={'/'} component={Landing}/>
                        <Route path={'/login'} component={Login}/>
                        <Route path={'/signup'} component={SignUp}/>
                        <Route path={'/newproject'} component={NewProject}/>
                        <Route path={'/profile'} component={MyProfile}/>
                        <Route path={'/loggedout'} component={YouHaveBeenLoggedOut}/>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
