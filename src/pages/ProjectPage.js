import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import getSessionInfo from '../components/getSessionInfo';
import Header from "../components/Header";
import SelectedTagButtonView from '../components/selectedTagButtonsView';
import axios from "axios/index";

class ProjectPage extends Component{

    state={
        username: "",
        verifiedUser: false,
        isLoggedIn: false,
        loading: true,
        project: {}
    };

    componentWillMount(){
        const params = new URLSearchParams(this.props.location.search);
        const projectId = params.get('id');
        getSessionInfo()
            .then((res)=>{
                let project = {};
                if(res && res.projects.includes(projectId)){
                    this.fetchProjects()
                        .then((p)=>{
                            for(let i = 0; i<p.length; i++){
                                if(p[i]._id === projectId){
                                    project = p[i];
                                    break;
                                }
                            }
                            this.setState({
                                username: res.emailId,
                                verifiedUser: res.isVerified,
                                isLoggedIn: true,
                                project: project
                            });
                        });
                }
                else{
                    let project = {};
                    this.fetchProjects()
                        .then((p)=> {
                            for (let i = 0; i < p.length; i++) {
                                if (p[i]._id === projectId) {
                                    project = p[i];
                                    break;
                                }
                            }
                            this.setState({
                                username: "",
                                verifiedUser: false,
                                isLoggedIn: false,
                                project: project
                            });
                        });
                }
        });
    }


    fetchProjects = async() =>{
        const response = await axios.get('/api/projects', {withCredentials: true});
        return response.data;
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

    requestLogout = async() => {
        try{
            const response = await axios.get('/api/logout', {withCredentials:true});
            return response.data.success;
        }
        catch(e){
            //Handle error
        }
    };

    render(){
        return(
            <div className={'container-fluid'}>
                <div className={'row'} style={styles.pageBanner}>
                    <div style={styles.overlayBanner}>
                        <div className={'container'} style={styles.pageContent}>
                            <Header
                                isLoggedIn={this.state.isLoggedIn}
                                username={this.state.username}
                                verifiedUser={this.state.verifiedUser}
                                onLogout={this.logOutUser}
                                screen={"newproject"}
                            />
                        </div>
                    </div>
                </div>

                <div className={'row'} style={styles.mainFields}>
                    <div className={'container'}>
                        <div className={'row'}>
                            <div className={'col-lg-9'}>
                                <div>
                                    <h1 style={styles.title}>{this.state.project.title}</h1>
                                </div>
                                <div>
                                    <h3 style={styles.description}>{this.state.project.description}</h3>
                                </div>
                            </div>
                        </div>

                        <div className={'row'}>
                            <div className={'col-lg-9'}>
                                <img src={this.state.project.imagePath} style={styles.projectImage}></img>
                            </div>
                            <div className={'col-lg-3'}>
                                <h4>Collaborators</h4>
                                <p>Feature still in development</p>
                                <h4>Tags</h4>
                                <SelectedTagButtonView id={'tags'} labels={this.state.project.tags} removeHandler={null}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/*
<h4>Roles</h4>
<SelectedTagButtonView id={'roles'} labels={this.state.project.roles} removeHandler={null}/>
 */

const styles = {
    pageBanner: {
        width: "100%",
        margin: "0"
    },
    overlayBanner: {
        backgroundColor: "#3F5EDD",
        width: "100%",
    },
    pageContent: {
        maxWidth: "960px"
    },
    mainFields: {
        backgroundColor: "#F7F7F7",
        padding: "20px"
    },
    dropZoneArea: {
        position: 'relative',
        textAlign: 'center',
        padding: '10px',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderRadius: '10px',
        borderColor: '#6c757d',
    },
    title: {
        fontSize: "34px",
        fontWeight: "300",
        color: "black",
        marginBottom: "20px"
    },
    description: {
        fontSize: "20px",
        color: "grey",
        fontWeight: "100",
        marginBottom: "20px"
    },
    projectImage: {
        width: "100%"
    },
};

export default ProjectPage;