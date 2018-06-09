import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

class ProjectTile extends Component {

    state = {
        loading:true,
        title: this.props.info.title,
        author: this.props.info.author.fullName
    };

    render(){
        return (
            <div className={"projectCardContainer col-lg-2 col-sm-5 col-xs-5"}>
                <Card className={"projectCard"}>
                    <CardActions>
                        <CardContent>
                            <h4 className={"projectCardTitle"}>{this.state.title}</h4>
                            <p className={"projectCardAuthor"}>by {this.state.author}</p>
                        </CardContent>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default ProjectTile;