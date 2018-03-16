import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    state = {
        isLoggedIn: this.props.isLoggedIn,
        username: this.props.username
    };

    componentWillMount(){
        const sessionInfo = JSON.parse(sessionStorage.getItem('sessionAccount'));
        if(sessionInfo && sessionInfo.fullName){
            this.setState({
                isLoggedIn: true,
                username: sessionInfo.fullName
            });
        }
    }

    render(){
        if(this.state.isLoggedIn===false){
            return (
                <header>
                    <h1 className="logo">Calypso</h1>
                    <ul className="header-buttons">
                        <li><button type="button" className="btn btn-outline-dark">Start a Project</button></li>
                        <Link to={'/login'}><li><button type="button" className="btn btn-outline-dark">Login</button></li></Link>
                    </ul>
                </header>
            );
        }

        else{
            return (
                <header>
                    <h1 className="logo">Calypso</h1>
                    <ul className="header-buttons">
                        <li><button type="button" className="btn btn-outline-dark">Start a Project</button></li>
                        <li><button type="button" className="btn btn-link">Welcome, {this.state.username}</button></li>
                    </ul>
                </header>
            );
        }
    }
}

export default Header;
