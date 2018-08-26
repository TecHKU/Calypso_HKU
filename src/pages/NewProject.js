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
import Header from '../components/Header';

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
        isLoggedIn: false,
        username: "",
        loading: true
    };

    componentWillMount(){
        getSessionInfo()
            .then(response => {
                if(response){
                    this.setState({
                        verifiedUser: response.isVerified,
                        isLoggedIn: true,
                        username: response.emailId,
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


    requestLogout = async() => {
        try{
            const response = await axios.get('/api/logout', {withCredentials:true});
            return response.data.success;
        }
        catch(e){
            //Handle error
        }
    };

    logOutUser = () => {
        if(this.requestLogout()){
            this.setState({
                username: "",
                verifiedUser: false,
                isLoggedIn: false
            });
        }
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
                    <div className={'row'} style={styles.pageBanner}>
                        <div style={styles.overlayBanner}>
                            <div className={'container'} style={styles.pageContent}>
                                <Header
                                    isLoggedIn={this.state.isLoggedIn}
                                    username={this.state.username}
                                    verifiedUser={this.state.verifiedUser}
                                    onLogout={this.logOutUser}
                                    screen={"newproject"}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={'row'} style={styles.mainFields}>
                        <div className={'container'}>
                            <div className={'row'}>
                                <div className={'col-lg-9'}>
                                    <div className={'form-group'} style={styles.formField}>
                                        <label htmlFor="Title">Project Title</label>
                                        <input value={this.state.projectTitle} type="text" id="Title"
                                               className={'form-control'} placeholder={"Give a title to your project"}
                                               onChange={this.handleTitle}/>
                                    </div>
                                    <div className={'form-group'} style={styles.formField}>
                                        <label htmlFor={'Description'}>Headline Description (keep it short!)</label>
                                        <textarea value={this.state.description} rows="2" id="Description" className={'form-control'}
                                              placeholder={"Give a short description"}
                                              onChange={this.handleDescription}/>
                                    </div>
                                    <ImageUploader handleUpload = {this.handleImage}/>
                                </div>
                                <div className={'col-lg-3'} style={styles.formField}>
                                    <h4>Collaborators</h4>
                                    <Collaborator/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'row'} style={{marginBottom: "200px"}}>
                        <div className={'container'}>
                            <div className={'row'}>
                                <div className={'col-lg-9'}>
                                    <AddTagsToProject assignTags={this.handleTags} selectedTags={this.state.tags}/>
                                    <SelectedTagButtonView id={'tags'} labels={this.state.tags}
                                                           removeHandler={this.removeTag}/>
                                    <hr className="my-4"/>
                                    <SkillsNeeded fetchRoles={this.handleRoles}/>
                                    <SelectedTagButtonView id={'roles'} labels={this.state.roles}
                                                           removeHandler={this.removeRole}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'row'} style={styles.footer}>
                        <div className={'container'}>
                            <div className={'row d-flex align-items-center'}>
                                <div className={'mr-auto'}>
                                    <Link to={'/'} style={{color: "white"}}><p><span><object data= {require("../imgs/backarrow.svg")} type="image/svg+xml"></object></span> home page</p></Link>
                                </div>
                                <div>
                                    <Link to={'/'}>
                                        <button
                                        className={'btn ExploreButton'}
                                        style={styles.footerButton}
                                        onClick={this.handleSubmit}
                                        >
                                            PUBLISH NOW    <span><object data= {require("../imgs/arrow.svg")} type="image/svg+xml"></object></span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        else{
            return(
                <Redirect to={'/login'}/>
            );
        }

    }
}

const styles = {
    pageBanner: {
        width: "100%",
        margin: "0"
    },
    overlayBanner: {
        backgroundColor: "#3F5EDD",
        width: "100%",
    },
    pageContent: {
        maxWidth: "960px"
    },
    formField: {
        paddingTop: "10px",
        paddingBottom: "10px"
    },
    mainFields: {
        backgroundColor: "#F7F7F7"
    },
    footer: {
        position: "fixed",
        bottom: "0",
        backgroundColor: "#3F5EDD",
        paddingTop: "20px",
        paddingBottom: "20px",
        color: "white"
    },
    footerButton: {
        backgroundColor: "white",
        backgroundImage: "none",
        color: "#3F5EDD",
        borderColor: "white",
        borderRadius: "5px",
        fontSize: "18px",
        lineHeight: "21px",
        fontWeight: "bold",
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingLeft: "42px",
        paddingRight: "42px"
    }
};

export default NewProject;