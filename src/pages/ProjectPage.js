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
                <Header isLoggedIn={this.state.isLoggedIn} username={this.state.username} verifiedUser={this.state.verifiedUser} onLogout={this.logOutUser}/>
                <div className={'row newproject'}>
                    <div className={'col-lg-7 offset-lg-1'}>
                        <div className={'coverImage'}>
                            <img src={this.state.project.imagePath}></img>
                        </div>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-lg-7 offset-lg-1'}>
                        <h1 style={styles.title}>{this.state.project.title}</h1>
                        <p style={styles.description}>{this.state.project.description}</p>
                    </div>
                    <div className={'col-lg-4'}>
                        <h4>Tags</h4>
                        <SelectedTagButtonView id={'tags'} labels={this.state.project.tags} removeHandler={null}/>
                        <h4>Roles</h4>
                        <SelectedTagButtonView id={'roles'} labels={this.state.project.roles} removeHandler={null}/>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
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
        paddingTop: '20px',
        paddingBottom: '20px'
    },
    description: {
        paddingTop: '10px',
    }
};

export default ProjectPage;