import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';

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
                <Button variant={"fab"} color={"primary"} aria-label={"add"}>
                    <AddIcon/>
                </Button>
            </div>
        );
    }
}

export default Collaborator;
