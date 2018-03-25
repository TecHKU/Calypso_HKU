import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountOptions from '../components/AccountOptions';

class Header extends Component {
    state = {
        isLoggedIn: this.props.isLoggedIn,
        username: this.props.username,
        verifiedUser: this.props.verifiedUser,
        displayAccountOptions: false
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            isLoggedIn: nextProps.isLoggedIn,
            username: nextProps.username,
            verifiedUser: nextProps.verifiedUser,
            displayAccountOptions: false
        });
    }

    showAccountOptions = () => {
        this.setState({displayAccountOptions: !this.state.displayAccountOptions});
    };

    logOutUser = () => {
        const {onLogout} = this.props;
        onLogout();
    };

    render(){
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

        else{
            if(this.state.verifiedUser){
                return (
                    <header>
                        <h1 className="logo">Calypso</h1>
                        <ul className="header-buttons">
                            <li><Link to={'/newproject'}><button type="button" className="btn btn-outline-dark">Start a Project</button></Link></li>
                            <li><button type="button" onClick={this.showAccountOptions} className="btn btn-link">Welcome, {this.state.username}</button></li>
                            {this.state.displayAccountOptions ? <AccountOptions logOutHandler={this.logOutUser}/> : null}
                        </ul>
                    </header>
                );
            }
            else{
                return (
                    <header>
                        <h1 className="logo">Calypso</h1>
                        <ul className="header-buttons">
                            <li>Verify your email to start a project</li>
                            <li><button type="button" onClick={this.showAccountOptions} className="btn btn-link">Welcome, {this.state.username}</button></li>
                        </ul>
                        {this.state.displayAccountOptions ? <AccountOptions logOutHandler={this.logOutUser}/> : null}
                    </header>
                );
            }

        }
    }
}

export default Header;
