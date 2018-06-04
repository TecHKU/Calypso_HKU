import React, { Component } from 'react';
import axios from 'axios';
import CheckBox from './CheckBox';
import SearchBar from "./SearchBar";

let roles = [];
let rolesDisplayed = roles;

/**
 * @author utkarsh867
 * The roles search and select component
 */
class RolesList extends Component {
    state = {
        checked: 0,
        search: "",
        roles: []
    };

    /**
     * Fetch roles from the database
     * @returns {Promise<*>}
     */
    fetchRoles = async() => {
        try{
            return await axios.get('/api/roles');
        }
        catch (e){
            //console.log(e);
            return null;
        }
    };

    /**
     * List all the roles that are already present on the database
     * @param response the response from the server
     */
    putRoles = (response) => {
        roles = response.data;
        rolesDisplayed = roles;
        this.setState({roles:roles});
    };

    componentWillMount(){
        this.selectedCheckboxes = new Set();
        try{
            this.fetchRoles()
                .then((response) => this.putRoles(response));
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
        console.log(this.selectedCheckboxes);
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
        if (rolesDisplayed) {
            return rolesDisplayed.map(this.createCheckbox);
        }
    };

    /**
     * When search text is being entered
     * @param val The value of the search field
     */
    onSearchRoles = (val) => {
        this.setState({search:val}, () =>{
            //console.log(this.state);
            this.modifyRolesList(this.state.search);
        });
    };

    /**
     * Modify the list of roles checkboxes as user enters search value
     * @param text The value of the search field
     */
    modifyRolesList = (text) =>{
        if(roles){
            this.setState({search:text});           //This is the jugaad I did not understand
            rolesDisplayed = [];
            if(text===""){
                rolesDisplayed = roles;
            }
            else{
                for(let i = 0; i<roles.length; i++){
                    if((roles[i].toLowerCase()).indexOf(text.toLowerCase())!==-1){
                        rolesDisplayed.push(roles[i])
                    }
                }
            }
        }
    };


    render() {
        return (
            <div>
                <SearchBar text="Search Roles" onSearch={this.onSearchRoles} />
                <div className="tags-div">
                    {this.createCheckboxes()}
                </div>
            </div>
        );
    }

}


export default RolesList;
