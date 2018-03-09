import React, { Component } from 'react';
import Tags from './Tags';
class SideBar extends Component {
    render() {
        return (
            <div className="col-3 sidebar">
                <h3>Filter your search</h3>
                <Tags/>
            </div>
        );
    }
}

export default SideBar;
