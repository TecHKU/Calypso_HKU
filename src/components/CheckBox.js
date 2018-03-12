import React, { Component } from 'react';

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

    toggleCheckboxChange = () =>{
        const {handleCheckboxChange, label} = this.props;

        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked,
            }
        ));

        console.log(label);
        handleCheckboxChange(label);
    };


    render() {
        const {label} = this.props;
        const {isChecked} = this.state;
        return (
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        value={label}
                        checked={isChecked}
                        onChange={this.toggleCheckboxChange}
                    />
                    <span className="checkbox-text">{label}</span>
                </label>
            </div>
        );
    }
}

export default CheckBox;
