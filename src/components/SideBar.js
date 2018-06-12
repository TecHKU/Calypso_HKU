import React, { Component } from 'react';
import Tags from './Tags';
import RolesList from './RolesList';
import PropTypes from 'prop-types';

/**
 * @author utkarsh867
 * The side bar on the homepage
 */

class SideBar extends Component {
    state={
        roles: [],
        tags: []
    };

    /**
     * Called when the Roles List component is updated
     * @param val The roles currently selected
     */
    rolesList = (val) => {
        const {rolesList} = this.props;
        rolesList(val);
    };

    tagsList = (val) => {
        const {tagsList} = this.props;
        tagsList(val);
    };

    render() {
        return (
            <div className="col-10 offset-1 sidebar">
                <h3>Filter your search</h3>
                <Tags tagsList={this.tagsList}/>
                <RolesList rolesList={this.rolesList}/>
            </div>
        );
    }
};

SideBar.propTypes = {
    rolesList: PropTypes.func,
    tagsList: PropTypes.func
};

export default SideBar;
