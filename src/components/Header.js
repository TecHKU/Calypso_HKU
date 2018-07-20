import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountOptions from '../components/AccountOptions';
import axios from 'axios';
import ButtonBase from '@material-ui/core/ButtonBase';
import Snackbar from '@material-ui/core/Snackbar';

/**
 * @author utkarsh867
 * The top header of the home page that renders according to user status
 */
class Header extends Component {
    state = {
        isLoggedIn: this.props.isLoggedIn,
        username: this.props.username,
        verifiedUser: this.props.verifiedUser,
        displayAccountOptions: false,
        displayVerifyEmail: !this.props.verifiedUser
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            isLoggedIn: nextProps.isLoggedIn,
            username: nextProps.username,
            verifiedUser: nextProps.verifiedUser,
            displayVerifyEmail: !nextProps.verifiedUser
        });
    }

    sendVerificationRequest = () => {
        axios.get('/api/resendVerification', {withCredentials: true}).then((res)=>{
            if(res.data.success === true){
                this.setState({
                    displayVerifyEmail: false
                });
            }
            else{
                this.setState({
                    displayVerifyEmail: false
                });
            }
        })
    };

    /**
     * Handles the logout of the user
     */
    logOutUser = () => {
        const {onLogout} = this.props;
        onLogout();
    };

    LoginComponent = () => {
        return(
            <div className={'d-flex align-content-center'}>
                <ul className="header-buttons">
                    <Link to={'/login'}><li className={'header-buttons-li'}><button type="button" className="btn btn-outline-dark">Login</button></li></Link>
                </ul>
            </div>
        );
    };

    AccountOptionsComponent = () => {
        return(
            <div className={'d-flex align-content-center'}>
                <ul className="header-buttons">
                    {this.state.verifiedUser ? <li className={'header-buttons-li'} id={'newProject'}><Link to={'/newproject'}><button type="button" className="btn btn-outline-dark">Start a Project</button></Link></li> : null}
                    <li className={'header-buttons-li'}><AccountOptions logOutHandler={this.logOutUser} params={this.state}/></li>
                </ul>
            </div>
        );
    };

    verificationError = () => (
        <ButtonBase
            focusRipple
            style = {{width: "100%"}}
        >
            <div onClick={this.sendVerificationRequest} style = {{width: "100%"}} id={'verificationError'} className={'d-flex justify-content-center align-content-center'}>
                <p id={'verificationErrorText'}>Please verify your email address here</p>
            </div>
        </ButtonBase>
    );

    verificationSent = () => (
        <div style = {{width: "100%"}} id={'verificationIncText'} className={'d-flex justify-content-center align-content-center'}>
            <p id={'verificationIncText'}>Verification email has been sent</p>
        </div>
    );

    verifyEmailComponent = () => {
        console.log(this.state);
        return (
            <div className={'d-flex justify-content-center align-content-center'}>
                { this.state.displayVerifyEmail===true ? this.verificationError() : this.verificationSent() }
            </div>
        );
    };

    render(){
        return(
            <header className={'top-bar'}>
                <div className={'d-flex justify-content-around align-content-center'}>
                    <div className={'logo-container'}>
                        <h1 className="logo"><Link className={'logo'} to={'/'}>Calypso</Link></h1>
                    </div>
                    {this.state.isLoggedIn? this.AccountOptionsComponent() : this.LoginComponent() }
                </div>
                { (this.state.isLoggedIn===true && this.state.verifiedUser===false) ? this.verifyEmailComponent() : null }
            </header>
        );
    }
}

export default Header;
