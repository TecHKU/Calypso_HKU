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
        this.state = {filters: false};
    }

    showFilters = (args) => {
        this.setState({
            filters: args
        })
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
                <Projects showFilters={this.showFilters}/>
                <SideDrawer show={this.state.filters}/>
            </div>
        </div>
    );
  }
}

export default Homepage;