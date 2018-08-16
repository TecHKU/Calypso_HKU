import React, { Component } from 'react';
import AutoSuggestBox from './AutoSuggestBox';
import axios from "axios/index";

let skills = [];

/**
 * @author utkarsh867
 * The Roles search and select component
 */
class SkillsNeeded extends Component {

    state ={
        rolesList: []
    };

    fetchRolesList = async() => {
        try{
            return await axios.get('/api/roles');
        }
        catch (e){
            //console.log(e);
            return null;
        }
    };

    componentWillMount(){
        this.fetchRolesList()
            .then((response) => {
                this.setState({
                    rolesList: response.data
                });
            })
    }

    skillsHandler = (val) => {
        if(skills.indexOf(val) ===-1 && val!==""){
            skills.push(val);
        }
        try{
            const {fetchRoles} = this.props;
            fetchRoles(skills);
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <div style={styles.formField}>
                <h4 style={styles.fieldTitle}>Project Roles</h4>
                <AutoSuggestBox id={'rolesBox'} keyVal={'rolesBox'} enterHandler={this.skillsHandler.bind(this)} placeholder={'Skills'} suggestionList={this.state.rolesList}/>
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

export default SkillsNeeded;
