import React, { Component } from 'react';
import axios from 'axios';
import ProjectTile from './ProjectTile';
import GridList from '@material-ui/core/GridList';
import Loading from './Loading';

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
                <div className="projects-container">
                    <div className="container-fluid">
                        <GridList cellHeight={200} className={'projectsList'} cols={6}>
                            {this.projectTiles()}
                        </GridList>
                    </div>
                </div>
            );
        }
    }
}

export default ProjectsScreen;
