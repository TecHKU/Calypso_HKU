import React, { Component } from 'react';
import Tags from './Tags';
import SkillsNeeded from './SkillsNeeded';

/**
 * @author utkarsh867
 * The side bar on the homepage
 */
class SideBar extends Component {
    render() {
        return (
            <div className="col-3 sidebar">
                <h3>Filter your search</h3>
                <Tags/>
                <SkillsNeeded/>
            </div>
        );
    }
}

export default SideBar;
