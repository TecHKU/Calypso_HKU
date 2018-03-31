import React, { Component } from 'react';
import AddTagsToProject from '../components/addTagsToProject';
import SelectedTagButtonView from '../components/selectedTagButtonsView';
import ImageUploader from '../components/ImageUploader';
import SkillsNeeded from "../components/SkillsNeeded";
import { Link } from 'react-router-dom';

class NewProject extends Component{
    payload = {
        title: "",
        description: "",
        imagePath: "",
        hitCount:0,
        tags:[],
        roles:[],
        collaborators: []
    };

    state = {
        tags: [],
        roles: [],
        projectTitle: "",
        description: "",
        collaborators: [],
        coverImage: ""
    };

    //This function will update the title state variable as the user gives input
    handleTitle = (e) =>{
        this.setState({
            projectTitle: e.target.value
        });
    };

    //This handles the deletion of tags when user clicks the cross button
    removeTag = (tag) => {
        let tags = this.state.tags;
        tags.splice(tags.indexOf(tag),1);
        this.setState({
            tags: tags
        });
    };

    //This handles the deletion of roles when user clicks the cross button
    removeRole = (role) => {
        let roles = this.state.roles;
        roles.splice(roles.indexOf(role),1);
        this.setState({
            roles: roles
        });
    };

    //This function will update the description state variable as the user gives input
    handleDescription = (e) =>{
        this.setState({
            description: e.target.value
        });
    };

    //This function will update the tags state variable as the user gives input
    handleTags = (tags) => {
        this.setState({
            tags: tags
        });
    };

    handleRoles = (roles) => {
        this.setState({
            roles: roles
        });
        console.log(roles);
    };

    render(){
        return(
            <div className={'container-fluid'}>
                <header>
                    <Link to={'/'}><span className={'vertical-center'}><i className="fas fa-home fa-2x"></i></span></Link>
                    <h1>Make a new project</h1>
                </header>
                <div className={'row newproject'}>
                    <div className={'col-lg-7 offset-lg-1'}>
                        <ImageUploader/>
                    </div>
                    <div className={'col-lg-4'}>
                        <p>Collaborators</p>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-lg-7 offset-lg-1'}>
                        <div className={'form-group'}>
                            <input value={this.state.projectTitle} type="text" className={'form-control'} placeholder={"Give a title to your project"} onChange={this.handleTitle}/>
                        </div>
                        <div className={'form-group'}>
                            <textarea value={this.state.description} rows="10" className={'form-control'} placeholder={"Give a short description"} onChange={this.handleDescription}/>
                        </div>
                    </div>
                    <div className={'col-lg-4'}>
                        <AddTagsToProject assignTags={this.handleTags} selectedTags={this.state.tags}/>
                        <SelectedTagButtonView id={'tags'} labels={this.state.tags} removeHandler={this.removeTag}/>
                        <SkillsNeeded fetchRoles={this.handleRoles}/>
                        <SelectedTagButtonView id={'roles'} labels={this.state.roles} removeHandler={this.removeRole}/>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-lg-8 offset-lg-2'}>
                        <button type="submit" className={"btn btn-primary"}>Create Project</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewProject;