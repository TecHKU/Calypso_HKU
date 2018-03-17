import React, { Component } from 'react';
import axios from 'axios';
import CheckBox from './CheckBox';
import SearchBar from "./SearchBar";

let tags = [];
let tags_to_display = tags;

class Tags extends Component {
    state = {
        checked: 0,
        search: "",
        tags: []
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
        console.log(this.selectedCheckboxes);
    };

    createCheckbox = (label) => (
        <CheckBox
            label={label}
            selected_set = {this.selectedCheckboxes}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
    );

    createCheckboxes = () => {
        if (tags_to_display) {
            return tags_to_display.map(this.createCheckbox);
        }
    };

    onSearchTags = (val) => {
        this.setState({search:val}, () =>{
            //console.log(this.state);
            this.modifyTagsList(this.state.search);
        });
    };

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
                    <form>
                        {this.createCheckboxes()}
                    </form>
                </div>
            </div>
        );
    }

}


export default Tags;
