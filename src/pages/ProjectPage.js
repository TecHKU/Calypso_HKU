import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import getSessionInfo from '../components/getSessionInfo';
import Header from "../components/Header";
import SelectedTagButtonView from '../components/selectedTagButtonsView';
import CollaboratorTile from '../components/CollaboratorTile';
import axios from "axios/index";
import Loading from '../components/Loading';

class ProjectPage extends Component{

    state={
        username: "",
        verifiedUser: false,
        isLoggedIn: false,
        loading: true,
        project: {},
        inProgressDialog: false
    };

    componentWillMount(){
        const params = new URLSearchParams(this.props.location.search);
        const projectId = params.get('id');
        getSessionInfo()
            .then((res)=>{
                let project = {};
                if(res){
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
                                project: project,
                                loading: false
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
                                    console.log(project);
                                    break;
                                }
                            }
                            this.setState({
                                username: "",
                                verifiedUser: false,
                                isLoggedIn: false,
                                project: project,
                                loading: false
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
        if(!this.state.loading){
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
                                    <div>
                                        <h3 style={styles.campaign}>{this.state.project.campaign}</h3>
                                    </div>
                                    <div>
                                        <img src={this.state.project.imagePath} style={styles.projectImage}></img>
                                    </div>
                                </div>
                                <div className={'col-lg-3'}>
                                    {(this.state.username === this.state.project.author.emailId) ?
                                        <div>
                                            <button
                                            className={'btn'}
                                            style={styles.editButton}
                                            onClick={() => { this.setState({inProgressDialog: true}); }}
                                            >
                                            EDIT LISTING  <span><object data={require("../imgs/arrow.svg")} type="image/svg+xml"></object></span>
                                            </button>
                                        </div>
                                        : <div></div>
                                    }
                                    <div style={styles.collaboratorTiles}>
                                        <h4 style={styles.minorTitle}>Collaborators</h4>
                                        <CollaboratorTile name={this.state.project.author.fullName} email={this.state.project.author.emailId}/>
                                    </div>
                                    <h4 style={styles.minorTitle}>Tags</h4>
                                    <SelectedTagButtonView id={'tags'} labels={this.state.project.tags} removeHandler={null}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'row'} style={styles.selectionBar}>
                        <div className={'container'}>
                            <div className={'row d-flex align-items-center'}>
                                <div className={'col-1'}>
                                    <h1 style={styles.selectionBarText}>Campaign</h1>
                                </div>
                                <div className={'mr-auto col-1 offset-1'}>
                                    <h1 style={styles.selectionBarText}>Roles</h1>
                                </div>
                                <div>
                                    <button
                                        className={'btn ExploreButton'}
                                        style={styles.selectionBarButton}
                                    >
                                        <a style={{textDecoration:'none', color: '#fff'}} href={`mailto:${this.state.project.author.emailId}?Subject=Enquiry%20from%20Calypso!`} target="_top">
                                          MESSAGE
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }

        else{
            return(
                <div className={'vertical-center justify-content-center'} style={{width: "100%"}}>
                    <Loading/>
                </div>
            );
        }
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
        paddingTop: "40px",
        paddingBottom: "40px",
        borderBottom: "0.5px solid black"
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
        color: "black",
        fontWeight: "100",
        marginBottom: "30px"
    },
    campaign: {
        fontSize: "20px",
        color: "black",
        fontWeight: "100",
        marginBottom: "30px"
    },
    projectImage: {
        width: "100%"
    },
    selectionBar: {
        backgroundColor: "white",
        borderBottom: "0.5px solid black",
        paddingTop: "10px",
        paddingBottom: "10px"
    },
    selectionBarText: {
        fontSize: "18px",
        lineHeight: "21px",
        fontWeight: "100",
        marginRight: "40px"
    },
    selectionBarButton: {
        backgroundColor: "#3F5EDD",
        backgroundImage: "none",
        color: "white",
        borderColor: "#3F5EDD",
        borderRadius: "5px",
        fontSize: "18px",
        lineHeight: "21px",
        fontWeight: "bold",
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingLeft: "42px",
        paddingRight: "42px"
    },
    collaboratorTiles: {
        width: "100%",
        marginTop: "10px",
        marginBottom: "50px"
    },
    minorTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        lineHeight: "21px",
        color: "black"
    },
    editButton: {
        backgroundColor: "white",
        backgroundImage: "none",
        color: "#3F5EDD",
        borderColor: "#3F5EDD",
        borderRadius: "5px",
        fontSize: "18px",
        lineHeight: "21px",
        fontWeight: "bold",
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingLeft: "42px",
        paddingRight: "42px",
        marginBottom: "32px",
    }
};

export default ProjectPage;
