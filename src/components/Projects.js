import React, { Component } from 'react';
import SearchBar from "./SearchBar";
import ProjectsScreen from "./ProjectsScreen";

/**
 * @author utkarsh867
 * The projects on the homepage
 */
class Projects extends Component {

    onSearch = (val) => {
        console.log(val);
    };

    render() {
        return (
            <div className="col-lg-12 projects">
                <SearchBar text="Search Projects" showFilters={this.props.showFilters} filterButton={true} onSearch={this.onSearch}/>
                <ProjectsScreen/>
            </div>
        );
  }
}

export default Projects;
