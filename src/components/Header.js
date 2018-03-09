import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
        <header>
            <h1 className="logo">Calypso</h1>
            <ul className="header-buttons">
                <li><button type="button" className="btn btn-outline-dark">Start a Project</button></li>
                <li><button type="button" className="btn btn-outline-dark">Login</button></li>
            </ul>
        </header>
    );
  }
}

export default Header;
