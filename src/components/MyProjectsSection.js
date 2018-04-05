import React, { Component } from 'react';
import Loading from './Loading';
import axios from 'axios';

const loadingStyle = {
    height: '50px'
};

class MyProjectsSection extends Component{

    state = {
        loading: true
    };

    requestProjects = async() => {
        const response = await axios.get('/api/projects', {withCredentials: true});
        return response;
    };

    componentWillMount(){
        this.requestProjects()
            .then(response => {
                console.log(response);
                this.setState({
                    loading: false
                })
            });
    }

    render(){
        if(this.state.loading){
            return(
                <div style={loadingStyle} className={'row'}>
                    <div className={'col-10 offset-1'}>
                        <Loading/>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className={'row'}>
                    <div className={'col-10 offset-1'}>
                        <p>There it goes</p>
                    </div>
                </div>
            );
        }
    }
}


export default MyProjectsSection;