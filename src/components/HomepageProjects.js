import React, { Component } from "react";
import Projects from "./Projects";
import SideDrawer from "./SideDrawer";

/**
 * @author utkarsh867
 * The HomepageProjects component of the Landing page
 */
class HomepageProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: false,
      tags: [],
      roles: []
    };
  }

  showFilters = args => {
    this.setState({
      filters: args
    });
  };

  tagsList = val => {
    const tags = Array.from(val);
    this.setState({
      tags: tags
    });
  };

  rolesList = val => {
    const roles = Array.from(val);
    this.setState({
      roles: roles
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className={"col-lg-9 col-sm-12"}>
            <a name="projects"></a>
            <Projects roles={this.state.roles} tags={this.state.tags} />
          </div>
          <div className={"col-lg-3 col-sm-12"}>
            <SideDrawer tagsList={this.tagsList} rolesList={this.rolesList} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomepageProjects;
