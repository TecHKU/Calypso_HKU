import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ButtonBase from '@material-ui/core/ButtonBase';
import PropTypes from 'prop-types';

class ProjectTile extends Component {

    state = {
        loading:true,
        title: this.props.info.title,
        author: this.props.info.author.fullName,
        id: this.props.info._id,
        imagePath: this.props.info.imagePath,
        openProject: false
    };

    componentWillReceiveProps(newProps){
        this.setState({
            title: newProps.info.title,
            author: newProps.info.author.fullName,
            id: newProps.info._id,
            imagePath: newProps.info.imagePath
        });
    }

    onOpenProject = () => {
        this.setState({
            openProject: true
        })
    };

    render(){
        if(this.state.openProject){
            return(
                <Redirect to={'/project?id='+ this.state.id}/>
            );
        }

        else{
            return (
                <div className={"col-lg-4 col-sm-12"} style={styles.projectTile}>
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
    }
};

ProjectTile.propTypes = {
    info: PropTypes.object
};

export default ProjectTile;