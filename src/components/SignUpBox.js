import React, { Component } from 'react';

class SignUpBox extends Component {

    state = {
        fullName: "",
        username: "",
        password: "",
        confirmPass: "",
        passwordMatch: true,
        validation: ""
    };

    handleSubmit = (e) => {
        const {submitHandler} = this.props;
        if(this.state.password===this.state.confirmPass){
            this.setState({passwordMatch: true});
            submitHandler(this.state);
        }
        else{
            this.setState({
                passwordMatch: false,
                validation: "is-invalid"
            });
        }
    };

    updateFullName = (e) =>{
        this.setState({fullName: e.target.value});
    };

    updateUsername = (e) =>{
        this.setState({username: e.target.value});
    };

    updatePassword = (e) =>{
        this.setState({password: e.target.value});
    };

    updateRePassword = async(e) => {
        await this.setState({confirmPass: e.target.value});
        if(this.state.password===this.state.confirmPass){
            this.setState({
                passwordMatch: true,
                validation: "is-valid"
            });
        }
        else{
            this.setState({
                passwordMatch: false,
                validation: "is-invalid"
            });
        }
    };

    render(){
        return (
            <div className="loginbox">
                <div className="form-group">
                    <input value={this.state.fullName} onChange={this.updateFullName} type="email" className="form-control" id="fullName" placeholder="Full Name" name="username"/>
                </div>
                <div className="form-group">
                    <input value={this.state.username} onChange={this.updateUsername} type="email" className="form-control" id="emailId" placeholder="Email address" name="email"/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" onChange={this.updatePassword} placeholder="Password" name="password"/>
                </div>
                <div className="form-group">
                    <input type="password" className={"form-control " + this.state.validation} onChange={this.updateRePassword} placeholder="Confirm Password" name="confirm-password"/>
                    <div className="valid-feedback"><p>Passwords match</p></div>
                    <div className="invalid-feedback"><p>Passwords do not match</p></div>
                </div>
                <button type="submit" className="btn btn-primary loginButton" onClick={this.handleSubmit.bind(this)}>Sign Up</button>
            </div>
        );
    }
}

export default SignUpBox;
