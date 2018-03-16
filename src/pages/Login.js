import React, { Component } from 'react';
import LoginBox from '../components/LoginBox';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

    state = {
        loginSuccess: false,
        redirect: false
    };

    componentWillMount(){
        const sessionInfo = JSON.parse(sessionStorage.getItem('sessionAccount'));
        if(sessionInfo && sessionInfo.fullName){
            this.setState({
                loginSuccess: true,
                redirect: true
            });
        }
    }

    verifyUser = async(username, password) => {
        try{
            // noinspection JSAnnotator
            const response = await axios.post('/api/login', {
                "emailId": username,
                "password": password
            },{withCredentials: true});
            if(response.data.loginSuccess){
                sessionStorage.setItem('sessionAccount', JSON.stringify(response.data.session));
                console.log(response.data.session);
                this.setState({
                    loginSuccess: true,
                    redirect: true
                });
            }
            else{
                sessionStorage.setItem('sessionAccount', null);
            }
        }
        catch(e) {
            //console.log(e);
        }
    };

    handleSubmit = (username, password) =>{
        console.log(username, password);
        this.verifyUser(username, password);
    };

    render() {
        if(this.state.redirect){
            return <Redirect to={"/"}/>
        }
        return (
            <div className={'container-fluid'}>
                <div className={'row vertical-center'}>
                    <div className={'jumbotron loginDialog col-4 offset-4'}>
                        <div>
                            <Redirect to={"/"}><h1>Calypso</h1></Redirect>
                        </div>
                        <hr className={'my-4'}/>
                        <LoginBox submitHandler={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
