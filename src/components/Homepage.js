import React, { Component } from 'react';
import Projects from "./Projects";
import SideBar from "./SideBar";
class Homepage extends Component {
  render() {
    return (
        <div className="container-fluid">
            <div>
                <h2 className="motivation-text">University is time to take risks, experiment and change the world<br/>
                    Discover, present and collaborate on student projects
                </h2>
            </div>
            <div className="row">
                <Projects/>
                <SideBar/>
            </div>
        </div>
    );
  }
}
export default Homepage;
