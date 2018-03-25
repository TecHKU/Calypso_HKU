import React, { Component } from 'react';
import axios from 'axios';
import AddTagsToProject from '../components/addTagsToProject';
import SelectedTagButtonView from '../components/selectedTagButtonsView';

class NewProject extends Component{

    state = {
        tags: [],
        roles: [],
        projectTitle: "",
        description: "",
        collaborators: [],
        coverimage: ""
    };

    handleTitle = (e) =>{
        this.setState({
            projectTitle: e.target.value
        });
    };

    removeTag = (tag) => {
        let tags = this.state.tags;
        tags.splice(tags.indexOf(tag),1);
        this.setState({
            tags: tags
        });
    };

    handleDescription = (e) =>{
        this.setState({
            description: e.target.value
        });
    };

    handleTags = (tags) => {
        this.setState({
            tags: tags
        });
    };

    render(){
        return(
            <div className={'container-fluid'}>
                <header>
                    <h1>Make a new project</h1>
                </header>
                <div className={'row newproject'}>
                    <div className={'col-lg-7 offset-lg-1'}>
                        <div className={'jumbotron'}>
                            <p>Image will go here</p>
                        </div>
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
                        <SelectedTagButtonView labels={this.state.tags} removeHandler={this.removeTag}/>
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