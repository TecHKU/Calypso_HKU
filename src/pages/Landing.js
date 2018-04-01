import React, { Component } from 'react';
import Header from '../components/Header';
import Homepage from '../components/Homepage'
import axios from 'axios';
import getSessionInfo from '../components/getSessionInfo';

/**
 * @author utkarsh867
 * The Home page of the project
 */
class Landing extends Component {
    state = {
        username: "",
        verifiedUser: false,
        isLoggedIn: false
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
            });
    }

    componentDidMount(){
        this.setState({
            isLoggedIn: this.state.isLoggedIn,
            username: this.state.username,
            verifiedUser: this.state.verifiedUser
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
        return (
            <div className={'container-fluid'}>
                <Header isLoggedIn={this.state.isLoggedIn} username={this.state.username} verifiedUser={this.state.verifiedUser} onLogout={this.logOutUser}/>
                <Homepage/>
            </div>
        );
    }
}

export default Landing;