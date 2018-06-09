import React, { Component } from 'react';
import axios from 'axios';
import ProjectTile from './ProjectTile';
import Loading from './Loading';
import Masonry from 'react-masonry-component';

/**
 * @author utkarsh867
 * The Projects view in the Projects component
 */
class ProjectsScreen extends Component {

    state={
        projects:[],
        loading: true
    };

    componentWillMount(){
        this.fetchProjects().then((projects) =>{
            this.setState({
                projects: projects,
                loading: false
            })
        });
    }

    fetchProjects = async() =>{
        const response = await axios.get('/api/projects', {withCredentials: true});
        return response.data;
    };

    projectsToDisplay = () =>{
        return this.state.projects;
    };

    projectTiles = () => {
        const projects = this.projectsToDisplay();
        console.log(projects);
        return projects.map(this.generateProjectTile);
    };

    generateProjectTile = (info) =>{
        return (
            <ProjectTile info={info}/>
        );
    };

    render() {
        if(this.state.loading){
            return (
                <div className="projects-container">
                    <div className="container-fluid">
                        <Loading/>
                    </div>
                </div>
            );
        }

        else{
            return (
                <div className="projectsContainer container">
                    <Masonry
                        className={'projectsList row'}
                    >
                        {this.projectTiles()}
                    </Masonry>
                </div>
            );
        }
    }
}

export default ProjectsScreen;
