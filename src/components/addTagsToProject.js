import React, { Component } from 'react';
import AutoSuggestBox from './AutoSuggestBox';
import axios from "axios/index";

/**
 * @type {Array}
 */
let selectedTags = [];

/**
 * @author utkarsh867
 * The sidebar in the NewProject that handles the addition of new tags
 * The selected tags in the list
 * Pass the following props to this Component:
 *  selectedTags - A list of currently selected tags
 *  assignTags - A function that will get back a list of selected tags as argument
 */
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

    /**
     * This handles the individual tag addition to the selected list
     * @param val The value in the input box that represents the tag that will be added
     */
    elemsHandler = (val) => {
        const {assignTags} = this.props;
        if(this.state.selectedTags && this.state.selectedTags.indexOf(val) ===-1 && val!==""){
            selectedTags.push(val);
            this.setState({
                selectedTags: selectedTags
            }, () => {assignTags(this.state.selectedTags);});

        }
    };

    /**
     * Requests for existing tags in the database to provide suggestions
     * @returns {Promise<*>}
     */
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
            <div style={styles.formField}>
                <h4 style={styles.fieldTitle}>Project Tags</h4>
                <AutoSuggestBox id={'tagsBox'} keyVal={'tagsBox'} enterHandler={this.elemsHandler.bind(this)} placeholder={'Enter your tags'} suggestionList={this.state.tagsList}/>
            </div>
        );
    }
}

const styles = {
    formField: {
        paddingTop: "10px",
        paddingBottom: "10px"
    },
    fieldTitle: {
        fontSize: "14px"
    }
};

export default AddTagsToProject;
