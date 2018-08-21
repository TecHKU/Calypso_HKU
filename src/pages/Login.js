import React, { Component } from 'react';
import LoginBox from '../components/LoginBox';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import getSessionInfo from '../components/getSessionInfo';

/**
 * Login page
 * @author utkarsh867
 */
class Login extends Component {

    state = {
        loginSuccess: false,
        redirect: false,
        incorrect: false,
        incomplete: false
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
        this.setState({
            incorrect: false,
            incomplete: false
        });

        if(username.length > 0){
            this.verifyUser(username, password);
        }
        else{
            this.setState({
                incomplete: true
            })
        }
    };

    render() {
        if(this.state.redirect){
            return <Redirect to={"/"}/>
        }

        return (
            <div className={'container-fluid'}>
                <div style={styles.loginPageContainer} className={'row vertical-center'}>
                    <div className={'container'}>
                        <div className={'row justify-content-center'}>
                            <Card style={styles.layout} id={'login'}>
                                <CardContent>
                                    <div className={'container-fluid'}>
                                        <div className={'row d-flex align-items-center justify-content-center'}>
                                            <Link to={"/"} style={styles.formTitle}><h1 style={styles.formTitle}>Calypso</h1></Link>
                                        </div>
                                        <hr className={'my-4'}/>
                                        <div className={'row justify-content-center'}>
                                            {(this.state.incorrect) ?
                                                <div className="error-text"><p style={styles.errorText}>Incorrect username or password</p></div> : null}
                                            {(this.state.incomplete) ?
                                                <div className="error-text"><p style={styles.errorText}>Please enter a username</p></div> : null}
                                            <LoginBox submitHandler={this.handleSubmit}/>
                                        </div>

                                        <div className={'row justify-content-center'}>
                                            <p>Need an account?</p>
                                        </div>
                                        <div className={'row justify-content-center'}>
                                            <Link to={"/signup"}><p>Sign up</p></Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    loginPageContainer: {
        backgroundColor: "#fafafa"
    },
    formTitle:{
        textDecoration: "none",
        color: "black",
        paddingTop: "10px",
        fontSize: "48px",
        fontWeight: "500"
    },
    layout: {
        padding: "40px",
    },
    errorText: {
        fontSize: "14px",
        fontWeight: "400"
    }
};

export default Login;
