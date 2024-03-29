import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import getSessionInfo from "../components/getSessionInfo";
import Loading from '../components/Loading';
import ProfileInfo from '../components/ProfileInfo';
import MyProjectsSection from '../components/MyProjectsSection';
/**
 * @author utkarsh867
 * The Home page of the project
 */
class MyProfile extends Component {
    state = {
        user: {},
        username: "",
        verifiedUser: false,
        isLoggedIn: false,
        projects: [],
        collabs: [],
        loading: true
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
            return (<Redirect to={'/loggedout'}/>);
        }
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
                    </div>
                    <div className={'row'} style={styles.profileContainer}>
                        <ProfileInfo user={this.state.user}/>
                    </div>
                    <div className={'row'}>
                        <MyProjectsSection/>
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
    profileContainer: {
        borderBottom: "0.5px solid black",
        marginBottom: "20px",
        backgroundColor: "#F7F7F7"
    }
};

export default MyProfile;