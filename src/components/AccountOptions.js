import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popover from 'material-ui/Popover/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';
/**
 * @author utkarsh867
 * The little dropdown for user options
 */
class AccountOptions extends Component {
    state = {
        open: false,
        anchorOrigin: {
            horizontal: 'left',
            vertical: 'bottom',
        },
        targetOrigin: {
            horizontal: 'left',
            vertical: 'top',
        }
    };

    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    logOut = () => {
        const {logOutHandler} = this.props;
        logOutHandler();
    };

    render(){
        return (
            <div>
                <button type="button" className="btn btn-outline-dark" onClick={this.handleClick}>Hi, {this.props.params.username}</button>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={this.state.anchorOrigin}
                    targetOrigin={this.state.targetOrigin}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu>
                        {this.props.params.verifiedUser ? <Link to={'/newproject'}><MenuItem primaryText="Create a New Project" /></Link> : null}
                        <MenuItem primaryText="My Profile" />
                        <MenuItem primaryText="Sign out" onClick={this.logOut}/>
                    </Menu>
                </Popover>
            </div>
        );
    }
}

export default AccountOptions;
