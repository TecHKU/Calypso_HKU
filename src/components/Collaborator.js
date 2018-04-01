import React, { Component } from 'react';

/**
 * @author utkarsh867
 * Collaborator in Project page component
 */
class Collaborator extends Component {

    state = {
        name: "",
        email: "",
        profile: "",
        addTile: true
    };

    componentWillMount(){

    }

    render() {
        return (
            <div className={'col-lg-2 collaborator'}>
                <img className={'img-fluid rounded-circle'} src={'https://png.icons8.com/metro/1600/plus.png'}/>
            </div>
        );
    }
}

export default Collaborator;
