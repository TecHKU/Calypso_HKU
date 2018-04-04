import React, { Component } from 'react';
import { BrowserRouter as Router , Route }from 'react-router-dom'
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NewProject from './pages/NewProject';

import { MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import {grey300, grey600, darkBlack, fullBlack, blue400} from 'material-ui/styles/colors';

const myTheme = getMuiTheme({
    palette: {
        primary1Color: blue400,
        primary2Color: grey600,
        textColor: darkBlack,
        borderColor: grey300,
        shadowColor: fullBlack
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
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
