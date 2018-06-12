import React, { Component } from 'react';
import SearchBar from "./SearchBar";
import ProjectsScreen from "./ProjectsScreen";
import axios from "axios/index";

/**
 * @author utkarsh867
 * The projects on the homepage
 */
class Projects extends Component {

    state = {
        projects: [],
        loading: true,
        displayProjects: []
    };


    componentWillMount(){
        this.fetchProjects().then((projects) =>{
            this.setState({
                projects: projects,
                displayProjects: projects,
                loading: false
            })
        });
    }

    fetchProjects = async() =>{
        const response = await axios.get('/api/projects', {withCredentials: true});
        return response.data;
    };

    onSearch = (val) => {
        const displayProjects = [];
        for(let i = 0; i<this.state.projects.length; i++){
            if(((this.state.projects[i].title).toLowerCase()).indexOf((val.toLowerCase())) >= 0){
                displayProjects.push(this.state.projects[i]);
            }
        }

        this.setState({
            displayProjects: displayProjects
        });

    };

    render() {
        return (
            <div className="col-lg-12 projects">
                <SearchBar text="Search Projects" showFilters={this.props.showFilters} filterButton={true} onSearch={this.onSearch}/>
                <ProjectsScreen projects={this.state.displayProjects} loading={this.state.loading}/>
            </div>
        );
    }
}

export default Projects;
