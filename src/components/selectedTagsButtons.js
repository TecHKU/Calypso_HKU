import React, { Component } from 'react';

class SelectedTagsButton extends Component {

    state = {
        label: this.props.label
    };

    componentWillReceiveProps(newProps){
        this.setState({
            label: newProps.label
        });
    }

    deleteTagHandler = (e) => {
        const { deleteHandler } = this.props;
        deleteHandler(this.state.label);
    };

    render() {
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

export default SelectedTagsButton;
