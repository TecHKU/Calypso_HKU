import React, { Component } from 'react';
import Header from '../components/Header';
import Homepage from '../components/Homepage'
import axios from 'axios';
import getSessionInfo from '../components/getSessionInfo';
import Loading from '../components/Loading';

/**
 * @author utkarsh867
 * The Home page of the project
 */
class Landing extends Component {
    state = {
        username: "",
        verifiedUser: false,
        isLoggedIn: false,
        loading: true
    };

    componentWillMount(){
        getSessionInfo()
            .then(response => {
                if(response){
                    this.setState({
                        isLoggedIn: true,
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
                this.setState({
                    loading: false
                })
            });
    }

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
            this.setState({
                username: "",
                verifiedUser: false,
                isLoggedIn: false
            });
        }
    };

    render() {
        if(this.state.loading){
            return(
                <div className={'container'}>
                    <Loading/>
                </div>
            )
        }
        return (
            <div className={'container-fluid'}>
                <Header isLoggedIn={this.state.isLoggedIn} username={this.state.username} verifiedUser={this.state.verifiedUser} onLogout={this.logOutUser}/>
                <Homepage/>
            </div>
        );
    }
}

export default Landing;