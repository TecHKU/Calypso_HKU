import React, { Component } from 'react';
import Projects from "./Projects";
class Homepage extends Component {
  render() {
    return (
        <div className="container-fluid">
        <div>
          <h2 className="motivation-text">University is time to take risks, experiment and change the world<br/>
            Discover, present and collaborate on student projects
          </h2>
        </div>
          <Projects/>
        </div>
    );
  }
}
export default Homepage;
