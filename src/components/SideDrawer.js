import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import SideBar from "./SideBar";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

class SideDrawer extends React.Component {
    state = {
        left: this.props.show
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

    render() {
        return (
            <div>
                <Drawer variant='persistent' anchor='right' open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <ClickAwayListener onClickAway={this.toggleDrawer('left', false)}>
                        <SideBar/>
                    </ClickAwayListener>
                </Drawer>
            </div>
        );
    }
}

export default SideDrawer;