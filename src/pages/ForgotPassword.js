import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import axios from 'axios';
import Loading from '../components/Loading';
import TextField from "@material-ui/core/TextField";
/**
 * @author utkarsh867
 * The Home page of the project
 */
class ForgotPassword extends Component {
    state = {
        success: false,
        reason: "",
        redirect: false,
        loading: false,
        username: "",
    };


    sendResetRequest = async() => {
        const url = `/api/forgotPassword`;
        const response = await axios.post(url, {emailId: this.state.username}, {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'}
        });
        if(response.data.success){
            this.setState({
                success: true,
                redirect: true
            })
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

    render() {
        if(this.state.redirect){
            return(
                <Redirect to={'/'}/>
            )
        }

        if(this.state.loading){
            return(
                <div className={'container'}>
                    <Loading/>
                </div>
            );
        }

        else{
            return (
                <div className={'container-fluid'}>
                    <div style={styles.forgotPageContainer} className={'row vertical-center'}>
                        <div className={'container'}>
                            <div className={'row justify-content-center'}>
                                <Card style={styles.layout} id={'login'}>
                                    <CardContent>
                                        <div className={'container-fluid'}>
                                            <div className={'row d-flex align-items-center justify-content-center'}>
                                                <Link to={"/"} style={styles.formTitle}><h1 style={styles.formTitle}>Calypso</h1></Link>
                                            </div>
                                            <hr className={'my-4'}/>
                                            <div style={{marginBottom: "20px"}} className={'row justify-content-center'}>
                                                <TextField value={this.state.username} onChange={this.updateUsername} type="email" className={"form-control " + this.state.usernameEmpty} id="emailId" placeholder="Enter your email address" name="email"/>
                                            </div>
                                            <div className={'row justify-centent-center'}>
                                                <button type="submit" className="btn btn-primary loginButton" onClick={this.sendResetRequest}>Send Reset Link</button>
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
}

const styles = {
    forgotPageContainer: {
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

export default ForgotPassword;