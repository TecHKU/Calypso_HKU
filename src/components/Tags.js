import React, { Component } from 'react';
import axios from 'axios';
import CheckBox from './CheckBox';
import SearchBar from "./SearchBar";

let tags = [];
let tags_to_display = tags;

/**
 * @author utkarsh867
 * The tags search and select component
 */
class Tags extends Component {
    state = {
        checked: 0,
        search: "",
        tags: []
    };

    /**
     * Fetch tags from the database
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

    /**
     * List all the tags that are already present on the database
     * @param response the response from the server
     */
    putTags = (response) => {
        tags = response.data;
        tags_to_display = tags;
        this.setState({tags:tags});
    };

    componentWillMount(){
        this.selectedCheckboxes = new Set();
        try{
            this.fetchTags()
                .then((response) => this.putTags(response));
        }
        catch (e){
            console.log(e);
        }
    };

    /**
     * The checkbox toggle handler
     * @param label The label of the corresponding checkbox
     */
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
        const {tagsList} = this.props;
        tagsList(this.selectedCheckboxes);
    };

    /**
     * Create the checkbox components with "label"
     * @param label The label corresponding to the checkbox
     * @returns {*} JSX element
     */
    createCheckbox = (label) => (
        <CheckBox
            label={label}
            selected_set = {this.selectedCheckboxes}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
    );

    /**
     * Map all labels
     * @returns {any[]}
     */
    createCheckboxes = () => {
        if (tags_to_display) {
            return tags_to_display.map(this.createCheckbox);
        }
    };

    /**
     * When search text is being entered
     * @param val The value of the search field
     */
    onSearchTags = (val) => {
        this.setState({search:val}, () =>{
            //console.log(this.state);
            this.modifyTagsList(this.state.search);
        });
    };

    /**
     * Modify the list of tags checkboxes as user enters search value
     * @param text The value of the search field
     */
    modifyTagsList = (text) =>{
        //Modify the tags array
        if(tags){
            this.setState({search:text});           //This is the jugaad I did not understand
            tags_to_display = [];
            if(text===""){
                tags_to_display = tags;
            }
            else{
                for(let i = 0; i<tags.length; i++){
                    if((tags[i].toLowerCase()).indexOf(text.toLowerCase())!==-1){
                        tags_to_display.push(tags[i])
                    }
                }
            }
        }
    };


    render() {
        return (
            <div>
                <SearchBar text="Search tags" onSearch={this.onSearchTags} />
                <div className="tags-div">
                    {this.createCheckboxes()}
                </div>
            </div>
        );
    }

}


export default Tags;
