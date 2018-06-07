import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountOptions from '../components/AccountOptions';
import Snackbar from '@material-ui/core/Snackbar';

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
                    <Link to={'/'}><h1 className="logo">Calypso</h1></Link>
                    <ul className="header-buttons">
                        {this.state.verifiedUser ? <li className={'header-buttons-li'}><Link to={'/newproject'}><button type="button" className="btn btn-outline-dark">Start a Project</button></Link></li> : <li><h4>Verify Email to Create Projects</h4></li>}
                        <li className={'header-buttons-li'}><AccountOptions logOutHandler={this.logOutUser} params={this.state}/></li>
                    </ul>
                    <Snackbar
                        open={this.state.displayVerifyEmail}
                        message="Verify your email address to make your own projects"
                        autoHideDuration={4000}
                        onRequestClose={this.hideVerifyEmail}
                    />
                </header>
            );
        }
    }
}

export default Header;
