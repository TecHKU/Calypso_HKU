import React, { Component } from 'react';
import AutoSuggestionBox from './AutoSuggestBox';

let skills = [];
class SkillsNeeded extends Component {

    skillsHandler = (val) => {
        if(skills.indexOf(val) ===-1 && val!==""){
            skills.push(val);
        }
        console.log(skills);
    };

    render() {
        return (
            <div>
                <hr className="my-4"/>
                <h4>Skills Needed</h4>
                    <AutoSuggestionBox enterHandler={this.skillsHandler} placeholder={'Skills'}/>
            </div>
        );
    }
}

export default SkillsNeeded;
