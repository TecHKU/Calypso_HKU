import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ButtonBase from '@material-ui/core/ButtonBase';
import PropTypes from 'prop-types';
import Icon from "@material-ui/core/Icon/Icon";
import Button from "@material-ui/core/Button/Button";
import SelectedTagButtonView from "./selectedTagButtonsView";

class ProjectTile extends Component {

    state = {
        loading:true,
        title: this.props.info.title,
        author: this.props.info.author.fullName,
        id: this.props.info._id,
        tags: this.props.info.tags,
        imagePath: this.props.info.imagePath,
        openProject: false,
        editProject: false,
        isEditable: (this.props.isEditable ? this.props.isEditable : false)
    };

    componentWillReceiveProps(newProps){
        this.setState({
            title: newProps.info.title,
            author: newProps.info.author.fullName,
            tags: newProps.info.tags,
            id: newProps.info._id,
            imagePath: newProps.info.imagePath,
            isEditable: (newProps.isEditable ? newProps.isEditable : false)
        });
    }

    onOpenProject = () => {
        this.setState({
            openProject: true
        })
    };

    onEditProject = () => {
        this.setState({
            editProject: true
        })
    };

    render(){
        if(this.state.openProject){
            return(
                <Redirect to={'/project?id='+ this.state.id}/>
            );
        }

        else if(this.state.editProject){
            return(
                <Redirect to={`/project?id=${this.state.id}&edit=1`}/>
            );
        }

        else{
            return (
                <div className={"col-lg-4 col-sm-12"} style={styles.projectTile}>
                    {this.state.isEditable ?
                        <Button style={styles.editButton} size={"small"} variant={"fab"} color={"primary"} aria-label={"edit"} onClick={this.onEditProject}>
                            <Icon>edit_icon</Icon>
                        </Button> : null}
                    <ButtonBase
                        onClick = {this.onOpenProject}
                        style = {{width: "100%", height: "100%"}}
                    >
                        <Card style={styles.projectCard}>
                            <CardMedia
                                image = {(this.state.imagePath && (!(this.state.imagePath === "abc"))) ? (this.state.imagePath) : require('../imgs/projectPlaceholder.png')}
                                style = {{width: "100%", height: "215px"}}
                            />
                            <CardContent style={styles.projectCardContent}>
                                <h4 style={styles.projectTileTitle}>{this.state.title}</h4>
                                <SelectedTagButtonView id={'tags'} labels={this.state.tags} removeHandler={null} />
                            </CardContent>
                        </Card>
                    </ButtonBase>
                </div>
            );
        }
    }
}

const styles = {
    projectTile: {
        marginTop: "10px",
        marginBottom: "10px"
    },
    projectCard: {
        width: "100%"
    },
    projectCardContent: {
        textAlign: "left",
        padding: "10px"
    },
    projectTileTitle: {
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "16px"
    },
    editButton: {
        position: "absolute",
        top: 10,
        right: 20,
        zIndex: 100
    }
};

ProjectTile.propTypes = {
    info: PropTypes.object,
    isEditable: PropTypes.bool
};

export default ProjectTile;