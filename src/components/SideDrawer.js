import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import SideBar from "./SideBar";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PropTypes from 'prop-types';

class SideDrawer extends React.Component {
    tagsList = (val) => {
        const {tagsList} = this.props;
        tagsList(val);
    };

    rolesList = (val) =>{
        const {rolesList} = this.props;
        rolesList(val);
    };

    render() {
        return (
            <div>
                <SideBar tagsList={this.tagsList} rolesList={this.rolesList}/>
            </div>
        );
    }
}

SideDrawer.propTypes = {
    show: PropTypes.bool,
    tagsList: PropTypes.func,
    rolesList: PropTypes.func
};

export default SideDrawer;