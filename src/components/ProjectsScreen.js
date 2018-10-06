import React, { Component } from 'react';
import ProjectTile from './ProjectTile';
import Loading from './Loading';
import Masonry from 'react-masonry-component';
import PropTypes from 'prop-types';
/**
 * @author utkarsh867
 * The Projects view in the Projects component
 */
class ProjectsScreen extends Component {

    state={
        projects:[],
        loading: true,
        isEditable: (this.props.isEditable ? this.props.isEditable : false)
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            projects: nextProps.projects,
            loading: nextProps.loading,
            isEditable: (nextProps.isEditable ? nextProps.isEditable : false)
        })
    }

    projectTiles = () => {
        const {projects} = this.state;
        return projects.map(this.generateProjectTile);
    };

    generateProjectTile = (info) =>{
        return (
            <ProjectTile info={info} isEditable={this.state.isEditable}/>
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

ProjectsScreen.propTypes = {
    projects: PropTypes.array,
    loading: PropTypes.bool,
    isEditable: PropTypes.bool
};

export default ProjectsScreen;
