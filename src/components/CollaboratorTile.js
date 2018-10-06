import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CollaboratorTile extends Component{
    state = {
        name: this.props.name,
        email: this.props.email
    };

    render(){
        return(
            <div className={'d-flex align-items-center'} style={styles.tile}>
                <div style={styles.circle}>
                    <img className="rounded-circle" style={styles.profilePicture} src={`https://api.adorable.io/avatars/"${this.state.email}`}/>
                </div>
                <div className={'flex-grow-1'}>
                    <h3 style={styles.text}>{this.state.name}</h3>
                </div>
            </div>
        );
    }
}


const styles = {
    tile: {
        marginTop: "20px",
        marginBottom: "20px"
    },
    circle: {
        height: "46px",
        width: "46px"
    },
    text: {
        fontSize: "18px",
        lineHeight: "21px",
        fontWeight: "100",
        marginLeft: "20px",
        marginBottom: "0"
    },
    profilePicture: {
        width: "100%"
    }
};


CollaboratorTile.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string

};

export default CollaboratorTile;