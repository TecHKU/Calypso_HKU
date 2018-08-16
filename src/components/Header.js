import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import AccountOptions from '../components/AccountOptions';
import axios from 'axios';
import ButtonBase from '@material-ui/core/ButtonBase';

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
                    <li className={'header-buttons-li'}>
                        <Link to={'/login'}>
                            <button type="button" className="btn" style={styles.loginButton}>LOGIN</button>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    AccountOptionsComponent = () => {
        return(
            <div className={'d-flex align-content-center'}>
                <ul className="header-buttons">
                    {this.state.verifiedUser ?
                        <li className={'header-buttons-li'} id={'newProject'}>
                            <Link to={'/newproject'}>
                                <button type="button" className="btn btn-outline-light" style={styles.buttonSpan}>
                                    Start a project
                                </button>
                            </Link>
                        </li> : null}
                    <li className={'header-buttons-li'}>
                        <AccountOptions logOutHandler={this.logOutUser} params={this.state}/>
                    </li>
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
                <p id={'verificationErrorText'}>Please verify your account by clicking on the link in the mail sent to your registered email address. Click here to resend the mail.</p>
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
            <header style={styles.headerComponent}>
                <div className={'d-flex'} style={styles.topBar}>
                    <div className={'mr-auto'}>
                        <h1 style={styles.logo}><Link style={styles.logo} to={'/'}>Calypso</Link></h1>
                    </div>
                    {this.state.isLoggedIn? this.AccountOptionsComponent() : this.LoginComponent() }
                </div>
                { (this.state.isLoggedIn===true && this.state.verifiedUser===false) ? this.verifyEmailComponent() : null }
            </header>
        );
    }
}

const styles = {
    headerComponent: {
        width: "100%",
        position: "relative",
        color: "white"
    },
    logo: {
        margin: "0",
        padding: "0",
        fontSize: "48px",
        textDecoration: "none",
        fontWeight: "bold",
        color: "white"
    },
    topBar: {
        marginTop: "1.875rem"
    },
    buttonSpan: {
        paddingTop: "10px",
        paddingLeft: "20px",
        paddingRight:"20px",
        paddingBottom: "10px"
    },
    loginButton: {
        outline: "none",
        color: "white",
        backgroundColor: "rgba(0,0,0,0)",
        fontSize: "18px",
        fontWeight: "bold"
    }
};

export default Header;
