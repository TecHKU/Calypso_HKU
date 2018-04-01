import React, { Component } from 'react';
import {Checkbox} from "material-ui";

/**
 * @author utkarsh867
 *
 */
class CheckBox extends Component {
    state={
        isChecked: false
    };

    componentWillMount(){
        const {selected_set} = this.props;
        if(selected_set.has(this.props.label)){
            this.setState({isChecked:true});
        }
    }

    /**
     * Toggle the tick mark in the checkbox
     */
    toggleCheckboxChange = () =>{
        const {handleCheckboxChange, label} = this.props;

        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked,
            }
        ));
        handleCheckboxChange(label);
    };


    render() {
        const {label} = this.props;
        return (
            <div className="checkbox">
                <Checkbox
                    label={label}
                    checked={this.state.isChecked}
                    onCheck={this.toggleCheckboxChange.bind(this)}
                />
            </div>
        );
    }
}

export default CheckBox;
