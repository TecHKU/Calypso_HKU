import React, { Component } from 'react';
import CheckBox from './CheckBox';

let tags = ["Computer Science", "Journalism", "Biotech","Mathematics", "Medicine", "Arts","Physics", "Chemistry", "Business"];
class Tags extends Component {
    state = {
        checked: 0
    };
    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    };

    toggleCheckbox = (label) => {
        if(this.selectedCheckboxes.has(label)){
            this.selectedCheckboxes.delete(label);
            this.setState(({checked})=>(
                {
                    checked: checked-1
                }
            ));
        }
        else{
            this.selectedCheckboxes.add(label);
            this.setState(({checked})=>(
                {
                    checked: checked+1
                }
            ));
        }
    };

    createCheckbox = (label) => (
        <CheckBox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
    );

    createCheckboxes = () => (
        tags.map(this.createCheckbox)
    );

    render() {
        return (
            <div className="tags-div">
                <form>
                    {this.createCheckboxes()}
                </form>
            </div>
        );
    }
}

export default Tags;
