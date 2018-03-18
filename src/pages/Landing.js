import React, { Component } from 'react';
import Header from '../components/Header';
import Homepage from '../components/Homepage'
import axios from 'axios';

class Landing extends Component {
    state = {
        username: "",
        verifiedUser: false,
        isLoggedIn: false
    };

    componentWillMount(){
        const sessionInfo = JSON.parse(sessionStorage.getItem('sessionAccount'));
        if(sessionInfo!==null && sessionInfo.fullName){
            this.setState({
                isLoggedIn: true,
                username: sessionInfo.fullName,
                verifiedUser: this.isVerified()
            });
        }
    }

    isVerified = () => {
        const sessionInfo = JSON.parse(sessionStorage.getItem('sessionAccount'));
        return sessionInfo !== null && sessionInfo.isVerified;
    };

    requestLogout = async() => {
        try{
            const response = await axios.get('/api/logout', {withCredentials:true});
            return response.data.success;
        }
        catch(e){
            //Handle error
        }
    };

    logOutUser = () => {
        if(this.requestLogout()){
            sessionStorage.setItem('sessionAccount', null);
            this.setState({
                username: "",
                verifiedUser: false,
                isLoggedIn: false
            });
        }
    };

    render() {
        return (
            <div className={'container-fluid'}>
                <Header isLoggedIn={this.state.isLoggedIn} username={this.state.username} verifiedUser={this.state.verifiedUser} onLogout={this.logOutUser}/>
                <Homepage/>
            </div>
        );
    }
}

export default Landing;