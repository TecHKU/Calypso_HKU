import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

/**
 * @author utkarsh867
 * The signup dialog on the signup page
 */
class SignUpBox extends Component {

    state = {
        fullName: "",
        fullNameEmpty: "is-valid",
        username: "",
        usernameEmpty: "is-valid",
        password: "",
        passwordEmpty: "is-valid",
        confirmPass: "",
        passwordMatch: true,
        validation: ""
    };

    handleSubmit = (e) => {
        if(this.state.fullName.length > 0 && this.state.username.length > 0 && this.state.password.length > 0){
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
        }
        else{

        }
    };

    updateFullName = (e) =>{
        if(e.target.value.length === 0){
            this.setState({
                fullName: e.target.value,
                fullNameEmpty: "is-invalid"
            });
        }
        else{
            this.setState({
                fullName: e.target.value,
                fullNameEmpty: "is-valid"
            });
        }
    };

    updateUsername = (e) =>{
        if(e.target.value.length === 0){
            this.setState({
                username: e.target.value,
                usernameEmpty: "is-invalid"
            });
        }
        else{
            this.setState({
                username: e.target.value,
                usernameEmpty: "is-valid"
            });
        }
    };

    updatePassword = (e) =>{
        if(e.target.value.length <= 7){
            this.setState({
                password: e.target.value,
                passwordEmpty: "is-invalid"
            });
        }
        else{
            this.setState({
                password: e.target.value,
                passwordEmpty: "is-valid"
            });
        }
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
            <div style={styles.layout}>
                <div className="form-group">
                    <TextField value={this.state.fullName} onChange={this.updateFullName} type="text" className={"form-control " + this.state.fullNameEmpty} id="fullName" placeholder="Name" name="fullname"/>
                    <div className="invalid-feedback"><p>Please enter your full name</p></div>
                </div>
                <div className="form-group">
                    <TextField value={this.state.username} onChange={this.updateUsername} type="email" className={"form-control " + this.state.usernameEmpty} id="emailId" placeholder="Email address" name="email"/>
                    <div className="invalid-feedback"><p>Please enter an email address</p></div>
                </div>
                <div className="form-group">
                    <TextField value={this.state.password} type="password" className={"form-control " + this.state.passwordEmpty} onChange={this.updatePassword} placeholder="Password" name="password"/>
                    <div className="invalid-feedback"><p>Please enter a password of atleast 8 characters</p></div>
                </div>
                <div className="form-group">
                    <TextField type="password" className={"form-control " + this.state.validation} onChange={this.updateRePassword} placeholder="Confirm Password" name="confirm-password"/>
                    <div className="valid-feedback"><p>Passwords match</p></div>
                    <div className="invalid-feedback"><p>Passwords do not match</p></div>
                </div>
                <button type="submit" className="btn btn-primary loginButton" onClick={this.handleSubmit.bind(this)}>Sign Up</button>
            </div>
        );
    }
}


const styles = {
    layout: {
        width: "100%"
    }
};

export default SignUpBox;
