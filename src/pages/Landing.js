import React, { Component } from 'react';
import Header from '../components/Header';
import Homepage from '../components/Homepage'

class Landing extends Component {
    render() {
        return (
            <div className={'container-fluid'}>
                <Header isLoggedIn={false} username=""/>
                <Homepage/>
            </div>
        );
    }
}

export default Landing;