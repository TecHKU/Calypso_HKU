import React, { Component } from 'react';
import Tags from './Tags';
import SkillsNeeded from './SkillsNeeded';
import RolesList from './RolesList';
import SelectedTagButtonView from './selectedTagButtonsView';

/**
 * @author utkarsh867
 * The side bar on the homepage
 */

class SideBar extends Component {
    state={
        roles: [],
        tags: []
    };

    handleRoles = (roles) => {
        this.setState({
            roles: roles
        });
    };

    removeRole = (role) => {
        let roles = this.state.roles;
        roles.splice(roles.indexOf(role),1);
        this.setState({
            roles: roles
        });
    };

    render() {
        return (
            <div className="col-10 offset-1 sidebar">
                <h3>Filter your search</h3>
                <Tags/>
                <RolesList/>
            </div>
        );
    }
}

export default SideBar;
