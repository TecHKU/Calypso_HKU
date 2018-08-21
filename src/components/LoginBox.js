import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
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
            <div style={styles.layout}>
                <div className="form-group">
                    <TextField value={this.state.username} onChange={this.updateUsername} type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" name="username"/>
                </div>
                <div className="form-group">
                    <TextField value={this.state.password} type="password" className="form-control" onChange={this.updatePassword} onKeyDown={this.onSubmitAfterPassword} placeholder="Password" name="password"/>
                </div>
                <div className={'d-flex'} style={styles.forgotPasswordDiv}>
                    <div className={'mr-auto'}>
                        <Link to = {'/'}>Forgot password?</Link>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary loginButton" onClick={this.handleSubmit.bind(this)}>Login</button>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    layout: {
        width: "100%"
    },
    forgotPasswordDiv: {
        paddingTop: "10px",
        paddingBottom: "20px"
    }
};

export default LoginBox;
