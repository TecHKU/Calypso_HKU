import React, { Component } from 'react';
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

    componentWillReceiveProps(nextProps){
        this.setState({
            projects: nextProps.projects,
            loading: nextProps.loading
        })
    }

    projectTiles = () => {
        const {projects} = this.state;
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
                <div className="container-fluid">
                    <Masonry className={'row'} >
                        {this.projectTiles()}
                    </Masonry>
                </div>
            );
        }
    }
}

export default ProjectsScreen;
