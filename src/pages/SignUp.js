import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import axios from 'axios';
import SignUpBox from '../components/SignUpBox';

/**
 * @author utkarsh867
 * The Sign up page
 */
class SignUp extends Component{

    state = {
        success: false,
        reason: "",
        redirect: false
    };

    componentWillMount(){
        const sessionInfo = JSON.parse(sessionStorage.getItem('sessionAccount'));
        if(sessionInfo!==null && sessionInfo.fullName){
            this.setState({
                redirect: true
            });
        }
        else{
            this.setState({
                redirect: false
            });
        }
    }

    /**
     * When the user taps the signup button
     * @param data JSON object that contains the input fields of signup box
     */
    handleSubmit = (data) =>{
        if(data.username.length > 0 && data.password.length > 0 && data.fullName.length > 0){
            this.requestSignUp(data);
        }
    };

    /**
     * Sends sign up request to the server
     * @param data JSON object of sign up box
     * @returns {Promise<void>}
     */
    requestSignUp = async(data) => {
        try{
            const response = await axios.post('/api/signup',{
                "emailId": data.username,
                "password": data.password,
                "fullName": data.fullName
            }, {withCredentials: true});

            this.setState({
                success: response.data.success,
                reason: response.data.reason
            });

        }

        catch(e){
            console.log(e);
        }
    };

    render(){
        if(this.state.success){
            return (<Redirect to={'/login'}/>);
        }
        else if(this.state.redirect){
            return (<Redirect to={'/'}/>);
        }
        return(
            <div className={'container-fluid'}>
                <div style={styles.signupPageContainer} className={'row vertical-center'}>
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
                                            {(!this.state.success) && this.state.reason==="exists" ? <div className={'error-text'}><p style={styles.errorText}>This email has already been registered</p></div> : null}
                                            <SignUpBox submitHandler={this.handleSubmit}/>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    signupPageContainer: {
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

export default SignUp;
