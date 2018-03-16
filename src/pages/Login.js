import React, { Component } from 'react';
import LoginBox from '../components/LoginBox';

class Login extends Component {

    handleSubmit = () =>{

    };

    render() {
        return (
            <div className={'container-fluid'}>
                <div className={'col-6'}>
                    <LoginBox/>
                </div>
            </div>
        );
    }
}

export default Login;
