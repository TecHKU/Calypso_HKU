import React, { Component } from 'react';
import SearchBar from "./SearchBar";
import ProjectsScreen from "./ProjectsScreen";

/**
 * @author utkarsh867
 * The projects on the homepage
 */
class Projects extends Component {
  render() {
    return (
        <div className="col-lg-9 projects">
            <SearchBar text="Search Projects"/>
            <ProjectsScreen/>
        </div>
    );
  }
}

export default Projects;
