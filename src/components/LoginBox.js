import React, { Component } from 'react';

class LoginBox extends Component {

    state = {
        username: "",
        password: ""
    };

    handleSubmit = (e) => {
        const {submitHandler} = this.props;
        submitHandler(this.state.username, this.state.password);
    };

    updateUsername = (e) =>{
        this.setState({username: e.target.value});
    };

    updatePassword = (e) =>{
        this.setState({password: e.target.value});
    };

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
                    <input value={this.state.username} onChange={this.updateUsername} type="email" className="form-control" id="exampleInputEmail1" placeholder="Username" name="username"/>
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
