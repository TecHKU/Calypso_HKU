import React, { Component } from 'react';
import axios from 'axios';
import ProjectsScreen from "./ProjectsScreen";

/**
 * Styles for child components inside this component
 * @type {{jumbotronStyle: {backgroundColor: string}}}
 */
const styles ={
    jumbotronStyle: {
        backgroundColor: 'white'
    }
};


class MyProjectsSection extends Component{

    state = {
        loading: true,
        displayProjects: []
    };

    /**
     * This function makes the server request and returns the all the projects of the current user
     * @returns {Promise<any>} The "data" property has the projects
     */
    requestProjects = async() => {
        const response = await axios.get('/api/currentUserProjects', {withCredentials: true});
        return response;
    };

    componentWillMount(){
        this.requestProjects()
            .then(response => {
                console.log(response);
                this.setState({
                    loading: false,
                    displayProjects: response.data
                })
            });
    }


    render(){
        return(
            <div className={'container'}>
                <div className={'row'}>
                    <h2>My Projects</h2>
                    <hr className={'my-4'}/>
                    <ProjectsScreen projects={this.state.displayProjects} loading={this.state.loading}/>
                </div>
            </div>
        )
    }
}


export default MyProjectsSection;