import React, { Component } from 'react';

/**
 * @author utkarsh867
 * The Projects view in the Projects component
 */
class ProjectsScreen extends Component {
  render() {
    return (
        <div className="projects-container">
            <div className="jumbotron jumbotron-fluid">
                <div className="container-fluid">
                    <h1 className="display-4">Projects</h1>
                    <p className="lead">The projects will be listed here.</p>
                </div>
            </div>
        </div>
    );
  }
}

export default ProjectsScreen;
