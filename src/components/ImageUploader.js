import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';

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
    onDrop(files) {
        this.setState({
            image: files[0].preview
        });
    }

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
                    <img src={this.state.image}/>
                </div>
            );
        }

        else {
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
                            <span><i className="text-secondary fas fa-cloud-upload-alt fa-8x"></i></span>
                            <p className={'text-secondary'}>Drag and drop files to upload</p>
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
        borderStyle: 'solid',
        borderWidth: '2px',
        borderRadius: '10px',
        borderColor: '#6c757d',
    }
};

export default ImageUploader;
