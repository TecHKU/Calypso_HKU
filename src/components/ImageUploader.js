import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class ImageUploader extends Component {

    state = {
        image: "",
        uploaded: false
    };

    onDrop(files) {
        this.setState({
            image: files[0].preview
        });
        console.log(files);
    }

    onDropAccepted = () => {
        //Make it the preview file
        styles.dropZone.zIndex = '200';
        styles.dropZone.top = 'auto';
        styles.dropZone.bottom = '10%';
        styles.dropZone.left = '90%';

        this.setState({
            uploaded: true
        });
    };

    render() {
        console.log(this.state);
        if(this.state.uploaded){
            return (
                <div className={'coverImage'}>
                    <Dropzone
                        onDrop={this.onDrop.bind(this)}
                        onDropAccepted={this.onDropAccepted}
                        style={styles.dropZone}>
                        <span><i className="fas fa-pencil-alt"></i></span>
                    </Dropzone>
                    <img src={this.state.image} />
                </div>
            );
        }

        else{
            return (
                <div className={'coverImage'}>
                    <Dropzone
                        onDrop={this.onDrop.bind(this)}
                        onDropAccepted={this.onDropAccepted}
                        style={styles.dropZone}>
                    </Dropzone>
                </div>
            );
        }
    }
}

let styles = {
    dropZone:{
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: 'white',
        textAlign: 'center',
        padding: '10px',
        zIndex: '1'
    }
};

export default ImageUploader;
