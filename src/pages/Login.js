import React, { Component } from 'react';
import LoginBox from '../components/LoginBox';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import getSessionInfo from '../components/getSessionInfo';

/**
 * Login page
 * @author utkarsh867
 */
class Login extends Component {

    state = {
        loginSuccess: false,
        redirect: false,
        incorrect: false
    };

    componentWillMount(){
        let sessionInfo = null;
        getSessionInfo()
            .then(response => {
                if(response){
                    sessionInfo = response;
                }

                if(sessionInfo!==null){
                    this.setState({
                        loginSuccess: true,
                        redirect: true
                    });
                }

                else{
                    this.setState({
                        loginSuccess: false,
                        redirect: false
                    });
                }
            });
    }

    /**
     * Verify the user and login after verification
     * @param username  The username that has been input
     * @param password  The password that has been input
     * @returns {Promise<void>}
     */
    verifyUser = async(username, password) => {
        try{
            // noinspection JSAnnotator
            const response = await axios.post('/api/login', {
                "emailId": username,
                "password": password
            },{withCredentials: true});
            if(response.data.loginSuccess){
                this.setState({
                    loginSuccess: true,
                    redirect: true,
                });
            }
            else{
                this.setState({
                    incorrect: true
                });
            }
        }
        catch(e) {
            //console.log(e);
        }
    };

    /**
     * When the user presses login button
     * @param username  The username that has been input
     * @param password  The password that has been input
     */
    handleSubmit = (username, password) =>{
        this.verifyUser(username, password);
    };

    render() {
        if(this.state.redirect){
            return <Redirect to={"/"}/>
        }

        return (
            <div className={'container-fluid'}>
                <div className={'row vertical-center'}>
                    <div className={'jumbotron loginDialog col-lg-4 offset-lg-4 col-md-8 offset-md-2 col-sm-10 offset-sm-1'}>
                        <div>
                            <Link to={"/"}><h1>Calypso</h1></Link>
                        </div>
                        <hr className={'my-4'}/>
                        { (this.state.incorrect)? <div class="error-text"><p>Incorrect username or password</p></div>: null}
                        <LoginBox submitHandler={this.handleSubmit}/>
                        <p>New Member?</p>
                        <Link to={"/signup"}><p>Sign Up</p></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
