import React, { Component } from 'react';
import SearchBar from "./SearchBar";
import ProjectsScreen from "./ProjectsScreen";
class Projects extends Component {
  render() {
    return (
        <div className="row projects">
            <div className="col-lg-9">
            <SearchBar/>
            <ProjectsScreen/>
            </div>
        </div>
    );
  }
}

export default Projects;
