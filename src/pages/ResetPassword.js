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
class ResetPassword extends Component {
    state = {
        success: false,
        reason: "",
        redirect: false,
        loading: false,
        password: "",
        confirmPass: "",
        passwordEmpty: "",
        validation: "",
        passwordMatch: false,
        redirect: false
    };

    componentWillMount(){
        const param = new URLSearchParams(this.props.location.search);
        if(!param.get('token')){
            this.setState({
                redirect: true
            })
        }
    }

    sendResetRequest = async() => {
        const url = `/api/resetPassword`;
        const param = new URLSearchParams(this.props.location.search);
        const response = await axios.post(url, {token: param.get('token'), password: this.state.password}, {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'}
        });
        return response.data;
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
        await this.setState({
            confirmPass: e.target.value
        });

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

    doReset = () => {
        if(this.state.password.length >= 8 && this.state.passwordMatch){
            this.sendResetRequest().then((res)=>{
                if(res.success){
                    this.setState({
                        redirect: true
                    });
                }
            });
        }
    };

    render() {
        if(this.state.redirect) {
            return (
                <Redirect to={'/'}/>
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
                                                <TextField value={this.state.password} type="password" className={"form-control " + this.state.passwordEmpty} onChange={this.updatePassword} placeholder="New Password" name="newpassword"/>
                                                <div className="invalid-feedback"><p>Please enter a password of atleast 8 characters</p></div>
                                            </div>
                                            <div style={{marginBottom: "20px"}} className={'row justify-content-center'}>
                                                <TextField type="password" className={"form-control " + this.state.validation} onChange={this.updateRePassword} placeholder="Re-enter New Password" name="newpassword"/>
                                                <div className="valid-feedback"><p>Passwords match</p></div>
                                                <div className="invalid-feedback"><p>Passwords do not match</p></div>
                                            </div>
                                            <div className={'row justify-centent-center'}>
                                                <button type="submit" className="btn btn-primary loginButton" onClick={this.doReset}>Reset Password</button>
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

export default ResetPassword;