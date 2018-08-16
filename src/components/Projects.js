import React, { Component } from 'react';
import SearchBar from "./SearchBar";
import ProjectsScreen from "./ProjectsScreen";
import axios from "axios/index";
import PropTypes from 'prop-types';

/**
 * @author utkarsh867
 * The projects on the homepage
 */
class Projects extends Component {

    state = {
        projects: [],
        tags: this.props.tags,
        roles: this.props.roles,
        loading: true,
        displayProjects: []
    };


    componentWillMount(){
        this.fetchProjects().then((projects) =>{
            this.setState({
                projects: projects,
                displayProjects: projects,
                loading: false
            }, () => {
                this.onSearch("");
            });
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            tags: nextProps.tags,
            roles: nextProps.roles
        }, () =>{
            this.onSearch("");
        });

    }

    fetchProjects = async() =>{
        const response = await axios.get('/api/projects', {withCredentials: true});
        return response.data;
    };

    /**
     * Checks whether there is an intersection of b with a.
     * @param a The base array which needs to be present
     * @param b The array to be checked
     * @returns {boolean}   Whether there is an intersection - Results in whether the project should be added
     */
    intersectionSet = (a, b) =>{
        //If the size of a is zero then there is nothing to compare to
        if(a.length===0) {
            return true;
        }
        else{
            for(let i=0; i<a.length; i++){
                if(b.includes(a[i])){
                    return true;
                }
            }
            return false;
        }
    };

    onSearch = (val) => {
        const displayProjects = [] ;
        for(let i = 0; i<this.state.projects.length; i++){
            if(((this.state.projects[i].title).toLowerCase()).indexOf((val.toLowerCase())) >= 0 && this.intersectionSet(this.state.roles, this.state.projects[i].roles) && this.intersectionSet(this.state.tags, this.state.projects[i].tags)){
                displayProjects.push(this.state.projects[i]);
            }
        }
        this.setState({
            displayProjects: displayProjects
        });
    };

    render() {
        return (
            <div className="col-lg-12">
                <SearchBar text="Search Projects" onSearch={this.onSearch}/>
                <ProjectsScreen projects={this.state.displayProjects} loading={this.state.loading}/>
            </div>
        );
    }
}

Projects.propTypes = {
    tags: PropTypes.array,
    roles: PropTypes.array
};

export default Projects;
