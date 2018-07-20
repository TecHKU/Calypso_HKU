import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

class ProjectTile extends Component {

    state = {
        loading:true,
        title: this.props.info.title,
        author: this.props.info.author.fullName,
        id: this.props.info._id
    };

    componentWillReceiveProps(newProps){
        this.setState({
            title: newProps.info.title,
            author: newProps.info.author.fullName,
            id: newProps.info._id
        });
    }

    render(){
        return (
            <div className={"projectCardContainer col-lg-2 col-sm-5 col-xs-5"}>
                <Card className={"projectCard"}>
                    <Link to={'/project?id='+ this.state.id}>
                        <CardActions>
                            <CardContent>
                                <h4 className={"projectCardTitle"}>{this.state.title}</h4>
                                <p className={"projectCardAuthor"}>by {this.state.author}</p>
                            </CardContent>
                        </CardActions>
                    </Link>
                </Card>
            </div>
        );
    }
}

export default ProjectTile;