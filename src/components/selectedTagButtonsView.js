import React, { Component } from 'react';
import SelectedTagsButton from './selectedTagsButtons';

/**
 * @author utkarsh867
 * The view that displays all the selected tag buttons
 */
class SelectedTagsButtonView extends Component {

    state = {
        labels: this.props.labels
    };

    /**
     * The label button
     * @param label The label of the button
     * @returns {*} JSX element
     */
    createButton = (label) =>{
        return (
            <div>
                <SelectedTagsButton
                    label={label}
                    deleteHandler={this.deleteTagsHandler}
                />
            </div>
        );
    };

    /**
     * Maps all the label buttons to be generated
     * @returns {any[]}
     */
    createButtons = () =>{
        if(this.state.labels){
            return this.state.labels.map(this.createButton);
        }
    };

    /**
     * When the user tries to delete the tag
     * @param tag
     */
    deleteTagsHandler = (tag) => {
        const {removeHandler} = this.props;
        removeHandler(tag);
    };

    componentWillReceiveProps(newProps){
        this.setState({
            labels: newProps.labels
        });
    }

    render() {
        return (
            <div className={'container-fluid projectTags'}>
                <div className="row">
                    {this.createButtons()}
                </div>
            </div>
        );
    }
}

export default SelectedTagsButtonView;
