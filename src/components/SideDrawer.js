import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import SideBar from "./SideBar";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PropTypes from 'prop-types';

class SideDrawer extends React.Component {
    state = {
        left: this.props.show,
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            left: nextProps.show
        })
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

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
                <Drawer variant='persistent' anchor='right' open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <ClickAwayListener onClickAway={this.toggleDrawer('left', false)}>
                        <SideBar tagsList={this.tagsList} rolesList={this.rolesList}/>
                    </ClickAwayListener>
                </Drawer>
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