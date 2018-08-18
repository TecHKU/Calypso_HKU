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
                <div style={styles.circle}></div>
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
        width: "46px",
        borderRadius: "50%",
        backgroundColor: "#C4C4C4"
    },
    text: {
        fontSize: "18px",
        lineHeight: "21px",
        fontWeight: "100",
        marginLeft: "20px",
        marginBottom: "0"
    }
};


CollaboratorTile.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string

};

export default CollaboratorTile;