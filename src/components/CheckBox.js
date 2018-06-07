import React, { Component } from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
            this.setState({
                isChecked:true
            });
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
                <FormControlLabel
                control={
                    <Checkbox
                        value={label}
                        checked={this.state.isChecked}
                        onChange={this.toggleCheckboxChange.bind(this)}
                    />
                }
                label={label}
                />

            </div>
        );
    }
}

export default CheckBox;
