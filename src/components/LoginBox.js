import React, { Component } from 'react';

/**
 * @author utkarsh867
 * The Login box of the login page. Handles all the logic
 */
class LoginBox extends Component {

    state = {
        username: "",
        password: ""
    };

    /**
     * When the user taps login
     * @param e
     */
    handleSubmit = (e) => {
        const {submitHandler} = this.props;
        submitHandler(this.state.username, this.state.password);
    };

    /**
     * As the user types the username
     * @param e
     */
    updateUsername = (e) =>{
        this.setState({username: e.target.value});
    };

    /**
     * As the user types the password
     * @param e
     */
    updatePassword = (e) =>{
        this.setState({password: e.target.value});
    };

    /**
     * When the user presses enter after typing the password
     * @param e
     */
    onSubmitAfterPassword = (e) =>{
        let c = e.keyCode;
        if (c===13){
            this.handleSubmit();
        }
    };

    render(){
        return (
            <div className="loginbox">
                <div className="form-group">
                    <input value={this.state.username} onChange={this.updateUsername} type="email" className="form-control" id="exampleInputEmail1" placeholder="Email Id" name="username"/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" onChange={this.updatePassword} onKeyDown={this.onSubmitAfterPassword} placeholder="Password" name="password"/>
                </div>
                <button type="submit" className="btn btn-primary loginButton" onClick={this.handleSubmit.bind(this)}>Login</button>
            </div>
        );
    }
}

export default LoginBox;
