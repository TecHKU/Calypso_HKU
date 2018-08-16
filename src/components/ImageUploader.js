import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

/**
 * The Image uploader box on the NewProject page
 * @author utkarsh867
 */
class ImageUploader extends Component {

    state = {
        image: "",
        uploaded: false
    };

    /**
     * When the file is dropped into the area
     * @param files The file  dropped
     */
    onDrop = (files) => {
        this.setState({
            image: files[0]
        }, () => {
            const {handleUpload} = this.props;
            handleUpload(this.state.image);
        });
    };

    /**
     * When the file is of acceptable type
     */
    onDropAccepted = () => {
        //Make it the preview file
        styles.dropZoneButton.zIndex = '200';
        styles.dropZoneButton.top = 'auto';
        styles.dropZoneButton.bottom = '10%';
        styles.dropZoneButton.left = '90%';

        this.setState({
            uploaded: true
        });
    };

    render() {
        if (this.state.uploaded) {
            return (
                <div className={'coverImage'}>
                    <Dropzone
                        onDrop={this.onDrop.bind(this)}
                        onDropAccepted={this.onDropAccepted}
                        style={styles.dropZoneButton}>
                        <Button variant={"fab"} color={"primary"} aria-label={"edit"}>
                            <Icon>edit_icon</Icon>
                        </Button>
                    </Dropzone>
                    <img src={this.state.image.preview}/>
                </div>
            );
        } else {
            return (
                <div className={'coverImage'}>
                    <Dropzone
                        onDrop={this.onDrop.bind(this)}
                        onDropAccepted={this.onDropAccepted}
                        multiple={false}
                        accept='image/png , image/jpg , image/jpeg'
                        style={styles.dropZoneArea}
                    >
                        <div className={'imageUploadBox'}>
                            <p style={styles.dropZoneText}>Insert a header image</p>
                            <span style={styles.dropZonePlus}>+</span>
                        </div>
                    </Dropzone>
                </div>
            );
        }
    }
}

let styles = {
    dropZoneButton: {
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(0,0,0,0)',
        textAlign: 'center',
        padding: '10px',
        zIndex: '1'
    },
    dropZoneArea: {
        position: 'relative',
        textAlign: 'center',
        padding: '10px',
        width: '100%',
        borderStyle: 'dashed',
        borderWidth: '4px',
        borderColor: '#CECECE',
    },
    dropZonePlus: {
        fontSize: "72px",
        lineHeight: "84px",
        color: "#3F5EDD"
    },
    dropZoneText: {
        color: "#AEAEAE",
        fontSize: "18px",
        lineHeight: "21px",
        fontWeight: "300"
    }
};

ImageUploader.propTypes = {
    handleUpload: PropTypes.func
};

export default ImageUploader;
