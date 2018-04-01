import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountOptions from '../components/AccountOptions';
import Snackbar from 'material-ui/Snackbar';

/**
 * @author utkarsh867
 * The top header of the home page that renders according to user status
 */
class Header extends Component {
    state = {
        isLoggedIn: this.props.isLoggedIn,
        username: this.props.username,
        verifiedUser: this.props.verifiedUser,
        displayAccountOptions: false,
        displayVerifyEmail: !this.props.verifiedUser
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            isLoggedIn: nextProps.isLoggedIn,
            username: nextProps.username,
            verifiedUser: nextProps.verifiedUser,
            displayVerifyEmail: !nextProps.verifiedUser
        });
    }

    /**
     * Handles the logout of the user
     */
    logOutUser = () => {
        const {onLogout} = this.props;
        onLogout();
    };

    hideVerifyEmail = () =>{
        this.setState({
            displayVerifyEmail: false
        });
    };

    render(){

        //If the user is not logged in
        if(this.state.isLoggedIn===false){
            return (
                <header>
                    <h1 className="logo">Calypso</h1>
                    <ul className="header-buttons">
                        <Link to={'/login'}><li><button type="button" className="btn btn-outline-dark">Login</button></li></Link>
                    </ul>
                </header>
            );
        }

        //If the user is logged in
        else{
            return(
                <header>
                    <h1 className="logo">Calypso</h1>
                    <ul className="header-buttons">
                        <li><AccountOptions logOutHandler={this.logOutUser} params={this.state}/></li>
                    </ul>
                    <Snackbar
                        open={this.state.displayVerifyEmail}
                        message="Verify your email address to make your own projects"
                        autoHideDuration={4000}
                        onRequestClose={this.hideVerifyEmail}
                    />
                </header>
            );
            /*
            //If user email is verified, we allow new project creation
            if(this.state.verifiedUser){
                return (
                    <header>
                        <h1 className="logo">Calypso</h1>
                        <ul className="header-buttons">
                            <li><Link to={'/newproject'}><button type="button" className="btn btn-outline-dark">Start a Project</button></Link></li>
                            <AccountOptions logOutHandler={this.logOutUser}/>
                        </ul>
                    </header>
                );
            }

            //If not verified, we do not allow new project
            else{
                return (
                    <header>
                        <h1 className="logo">Calypso</h1>
                        <ul className="header-buttons">
                            <li>Verify your email to start a project</li>
                            <AccountOptions logOutHandler={this.logOutUser}/>
                        </ul>
                    </header>
                );
            }
            */
        }
    }
}

export default Header;
