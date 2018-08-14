import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * @author utkarsh867
 * The design of the label button
 */
class SelectedTagsButton extends Component {

    state = {
        label: this.props.label
    };

    componentWillReceiveProps(newProps){
        this.setState({
            label: newProps.label
        });
    }

    /**
     * When the user tries to delete the label button
     * @param e
     */
    deleteTagHandler = (e) => {
        const { deleteHandler } = this.props;
        deleteHandler(this.state.label);
    };

    render() {
        if(this.props.deleteHandler === null){
            return (
                <div className={'tagButton'}>
                    <span>{this.state.label}</span>
                </div>
            );
        }
        else{
            return (
                <div className={'tagButton'}>
                    <span>{this.state.label}
                        <span className={'tagButtonCross'} onClick={this.deleteTagHandler} id={this.props.label}>
                            <i className="fas fa-times"></i>
                        </span>
                    </span>
                </div>
            );
        }

    }
}

SelectedTagsButton.propTypes = {
    label: PropTypes.string,
    deleteHandler: PropTypes.func
};

export default SelectedTagsButton;
