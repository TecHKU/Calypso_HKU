import React, { Component } from 'react';
import AutoSuggestBox from './AutoSuggestBox';
import axios from "axios/index";

let selectedTags = [];
class AddTagsToProject extends Component {
    state = {
        selectedTags: this.props.selectedTags,
        tagsList: []
    };

    componentWillMount(){
        this.fetchTags()
            .then((response) => {
                this.setState({
                    tagsList: response.data
                });
            });
    }

    elemsHandler = (val) => {
        const {assignTags} = this.props;
        if(this.state.selectedTags && this.state.selectedTags.indexOf(val) ===-1 && val!==""){
            selectedTags.push(val);
            this.setState({
                selectedTags: selectedTags
            }, () => {assignTags(this.state.selectedTags);});

        }
    };

    fetchTags = async() => {
        try{
            return await axios.get('/api/tags');
        }
        catch (e){
            //console.log(e);
            return null;
        }
    };

    render() {
        return (
            <div>
                <hr className="my-4"/>
                <h4>Add Tags</h4>
                <AutoSuggestBox id={'tagsBox'} keyVal={'tagsBox'} enterHandler={this.elemsHandler.bind(this)} placeholder={'Enter your tags'} suggestionList={this.state.tagsList}/>
            </div>
        );
    }
}

export default AddTagsToProject;
