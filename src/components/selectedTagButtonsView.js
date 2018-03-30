import React, { Component } from 'react';
import SelectedTagsButton from './selectedTagsButtons';

class SelectedTagsButtonView extends Component {

    state = {
        labels: this.props.labels
    };

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

    createButtons = () =>{
        if(this.state.labels){
            return this.state.labels.map(this.createButton);
        }
    };

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
