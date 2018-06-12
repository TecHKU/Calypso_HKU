import React, { Component } from 'react';
import Projects from "./Projects";
import SideDrawer from './SideDrawer'

/**
 * @author utkarsh867
 * The Homepage component of the Landing page
 */
class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: false,
            tags: [],
            roles: []
        };
    }

    showFilters = (args) => {
        this.setState({
            filters: args
        })
    };

    tagsList = (val) => {
        const tags = Array.from(val);
        this.setState({
            tags: tags
        });
    };

    rolesList = (val) =>{
        const roles = Array.from(val);
        this.setState({
            roles:roles
        });
    };


  render() {
    return (
        <div className="container-fluid">
            <div>
                <h2 className="motivation-text">University is time to take risks, experiment and change the world<br/>
                    Discover, present and collaborate on student projects
                </h2>
            </div>
            <div className="row">
                <Projects showFilters={this.showFilters} roles={this.state.roles} tags={this.state.tags}/>
                <SideDrawer show={this.state.filters} tagsList={this.tagsList} rolesList={this.rolesList}/>
            </div>
        </div>
    );
  }
}

export default Homepage;