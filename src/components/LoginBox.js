import React, { Component } from 'react';

class LoginBox extends Component {

    state = {
        username: "",
        password: ""
    };

    handleSubmit = (e) => {
        const {submitHandler} = this.props;
        submitHandler(this.state.username, this.state.password)
    };

    updateUsername = (e) =>{
        this.setState({username: e.target.value});
    };

    render(){
        return (
            <div className="loginbox">
                <div className="form-group">
                    <input value={this.state.username} onChange={this.updateUsername} type="email" className="form-control" id="exampleInputEmail1" placeholder="Username" name="username"/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
            </div>
        );
    }
}

export default LoginBox;
