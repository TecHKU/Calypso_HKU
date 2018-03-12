import React, { Component } from 'react';
import LoginBox from "./LoginBox";

class Header extends Component {
    state = {
        isLoggedIn: this.props.isLoggedIn,
        username: this.props.username,
        showLoginBox: false
    };

    onLoginClick = () => {
        console.log("Clicked!");
        if(this.state.showLoginBox===false){
            this.setState({showLoginBox: true});
        }
        else{
            this.setState({showLoginBox: false});
        }
    };

    onSubmitLoginHandler = (username, password) => {
        this.setState({
            isLoggedIn: true,
            username: username,
            showLoginBox: false
        })
    };

    render(){
        console.log(this.state);
        if(this.state.isLoggedIn===false){
            return (
                <header>
                    <h1 className="logo">Calypso</h1>
                    <ul className="header-buttons">
                        <li><button type="button" className="btn btn-outline-dark">Start a Project</button></li>
                        <li><button type="button" className="btn btn-outline-dark" onClick={this.onLoginClick}>Login</button></li>
                        { this.state.showLoginBox ? <LoginBox submitHandler={this.onSubmitLoginHandler}/> : null }
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
                        <li><button type="button" className="btn btn-outline-dark">Hi! {this.state.username}</button></li>
                    </ul>
                </header>
            );
        }
    }
}

export default Header;
