import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AccountOptions extends Component {
    logOut = () => {
        const {logOutHandler} = this.props;
        logOutHandler();
    };
    render() {
        return (
            <div className="accountOptions">
                <div><Link to={'/'}><button onClick={this.logOut} className="btn btn-link"><p>Logout</p></button></Link></div>
            </div>
        );
    }
}

export default AccountOptions;
