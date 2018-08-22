import React, { Component } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import getSessionInfo from "../components/getSessionInfo";
import Loading from '../components/Loading';
/**
 * @author utkarsh867
 * The Home page of the project
 */
class Verification extends Component {
    state = {
        loading: true,
        isLoggedIn: false,
        username: "",
        verifiedUser: false
    };

    componentWillMount(){
        getSessionInfo()
            .then(response => {
                if(response){
                    this.setState({
                        isLoggedIn: true,
                        user: response,
                        username: response.fullName,
                        verifiedUser: response.isVerified
                    });
                }
                else{
                    this.setState({
                        username: "",
                        verifiedUser: false,
                        isLoggedIn: false
                    });
                }
            });

        const params = new URLSearchParams(this.props.location.search);
        this.setState({
            verificationId: params.get('id')
        }, ()=>{
            this.sendVerificationRequest().then((res)=>{
                if(res.success){
                    this.setState({
                        loading: false
                    })
                }
            });
        });
    }

    sendVerificationRequest = async() => {
        const url = `/api/verify?id=${this.state.verificationId}`;
        const response = await axios.get(url, {withCredentials: true});
        return response.data;
    };

    render() {
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
                    <div className={'row'} style={styles.pageBanner}>
                        <div style={styles.overlayBanner}>
                            <div className={'container'} style={styles.pageContent}>
                                <Header
                                    isLoggedIn={this.state.isLoggedIn}
                                    username={this.state.username}
                                    verifiedUser={this.state.verifiedUser}
                                    onLogout={this.logOutUser}
                                />
                            </div>
                        </div>
                        <div className={'row'} style={styles.messageDiv}>
                            <div className={'container'}>
                                <div className={'row'}>
                                    <h2 style={{fontSize: "48px", fontWeight: "100", padding: "20px"}}>Congratulations!</h2>
                                </div>
                                <div className={'row'}>
                                    <h3 style={{fontSize: "32px", fontWeight: "100", padding: "20px"}}>You have verified your email address.</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}



const styles = {
    pageBanner: {
        width: "100%",
        margin: "0"
    },
    overlayBanner: {
        backgroundColor: "#3F5EDD",
        width: "100%",
    },
    messageDiv: {
        marginTop: "50px"
    }
};

export default Verification;