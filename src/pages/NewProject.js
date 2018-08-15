import React, { Component } from 'react';
import AddTagsToProject from '../components/addTagsToProject';
import SelectedTagButtonView from '../components/selectedTagButtonsView';
import ImageUploader from '../components/ImageUploader';
import SkillsNeeded from "../components/SkillsNeeded";
import Collaborator from '../components/Collaborator';
import { Link , Redirect} from 'react-router-dom';
import Loading from '../components/Loading';
import axios from 'axios';
import getSessionInfo from "../components/getSessionInfo";

/**
 * "The Start A New Project" page
 * @author utkarsh867
 */
class NewProject extends Component{
    /**
     * The payload that is needed by the server
     * @type {{title: string, description: string, imagePath: string, hitCount: number, tags: Array, roles: Array, collaborators: Array}}
     */
    payload = {
        title: "",
        description: "",
        imagePath: "",
        hitCount:0,
        tags:[],
        roles:[],
        collaborators: []
    };

    state = {
        tags: [],
        roles: [],
        projectTitle: "",
        description: "",
        collaborators: [],
        coverImage: "",
        enableSubmit: false,
        verifiedUser: false,
        loading: true
    };

    componentWillMount(){
        getSessionInfo()
            .then(response => {
                console.log(response);
                if(response){
                    this.setState({
                        verifiedUser: response.isVerified,
                        loading: false
                    });
                }
                else{
                    this.setState({
                        verifiedUser: false,
                        loading: false
                    })
                }
            });
    }

    /**
     * Post the project to the server
     * @returns {Promise<*>}
     */
    postPayload = async() => {
        const response = await axios.post('/api/newproject',
            this.payload,
            { withCredentials: true});
        return response.data;
    };

    /**
     * Update the title state variable as the user gives input
     * @param e The title input box
     */
    handleTitle = (e) =>{
        this.setState({
            projectTitle: e.target.value
        });
    };

    /**
     * Handles deletion of tags when the user presses x
     * @param tag The tag value that needs to be deleted
     */
    removeTag = (tag) => {
        let tags = this.state.tags;
        tags.splice(tags.indexOf(tag),1);
        this.setState({
            tags: tags
        });
    };

    /**
     * Handles the deletion of roles when user clicks the cross button
     * @param role The role value that needs to be deleted
     */
    removeRole = (role) => {
        let roles = this.state.roles;
        roles.splice(roles.indexOf(role),1);
        this.setState({
            roles: roles
        });
    };

    /**
     * Handles image uploading to AWS S3 and gets back a URL
     * @param image The image object
     */
    handleImage = (image) => {
        this.setState({
            coverImage: image
        }, () => {
            this.setState({
                enableSubmit: true
            })
        });
    };

    /**
     * Gets the signed URL from the server to upload the image
     */
    callImageUploadAPI = async(file, callback) => {
        const response = await axios.post('/api/imageUpload', {filename: file.name }, {withCredentials: true});
        const options = {
            headers: {
                'Content-Type': file.type,
                'x-amz-acl': 'public-read'
            }
        };
        const aws_response = await axios.put(response.data.signedRequest, file, options);
        //console.log(aws_response);
        callback(response.data.url);
    };

    /**
     * Update the description state variable as the user gives input
     * @param e The description box
     */
    handleDescription = (e) =>{
        this.setState({
            description: e.target.value
        });
    };

    /**
     * Update the tags state variable as the user gives input
     * @param tags The tags array that has been selected
     */
    handleTags = (tags) => {
        this.setState({
            tags: tags
        });
    };

    /**
     * Handles the state variable roles of the project
     * @param roles The roles array that has been selected
     */
    handleRoles = (roles) => {
        this.setState({
            roles: roles
        });
    };

    /**
     * When the user submits the project
     *
     * The image uploading will take place first. Then the rest.
     */
    handleSubmit = () => {
        this.callImageUploadAPI(this.state.coverImage, (url)=>{
            console.log(url);
            this.payload.title = this.state.projectTitle;
            this.payload.description = this.state.description;
            this.payload.collaborators = this.state.collaborators;
            this.payload.imagePath = url;
            this.payload.tags = this.state.tags;
            this.payload.roles = this.state.roles;
            this.postPayload();
        });
    };


    render(){

        if(this.state.loading){
            return(
                <div className={'container'}>
                    <Loading/>
                </div>
            );
        }
        else if(this.state.verifiedUser === true){
            return(
                <div className={'container-fluid'}>
                    <header className={'d-flex justify-content-around align-content-center top-bar'}>
                        <div className={'d-flex align-content-center'}>
                            <div className={'logo-container'}>
                                <h1 className="logo"><Link className={'logo'} to={'/'}>Calypso</Link></h1>
                            </div>
                        </div>
                    </header>
                    <div className={'row newproject'}>
                        <div className={'col-lg-7 offset-lg-1'}>
                            <ImageUploader handleUpload = {this.handleImage}/>
                        </div>
                        <div className={'col-lg-4'}>
                            <h4>Collaborators</h4>
                            <Collaborator/>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-lg-7 offset-lg-1'}>
                            <div className={'form-group'}>
                                <input value={this.state.projectTitle} type="text" className={'form-control'} placeholder={"Give a title to your project"} onChange={this.handleTitle}/>
                            </div>
                            <div className={'form-group'}>
                                <textarea value={this.state.description} rows="15" className={'form-control'} placeholder={"Give a short description"} onChange={this.handleDescription}/>
                            </div>
                        </div>
                        <div className={'col-lg-4'}>
                            <AddTagsToProject assignTags={this.handleTags} selectedTags={this.state.tags}/>
                            <SelectedTagButtonView id={'tags'} labels={this.state.tags} removeHandler={this.removeTag}/>
                            <SkillsNeeded fetchRoles={this.handleRoles}/>
                            <SelectedTagButtonView id={'roles'} labels={this.state.roles} removeHandler={this.removeRole}/>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-lg-8 offset-lg-1'}>
                            <Link to={'/'}><button type="submit" className={"btn btn-primary"} onClick={this.handleSubmit}>Create Project</button></Link>
                        </div>
                    </div>
                </div>
            );
        }

        else{
            return(
                <Redirect to={'/'}/>
            );
        }

    }
}

export default NewProject;