import React, { Component } from 'react';
import {FloatingActionButton} from "material-ui";
import ContentAdd from 'material-ui/svg-icons/content/add';

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
                <FloatingActionButton>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default Collaborator;
