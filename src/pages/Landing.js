import React, { Component } from 'react';
import Header from '../components/Header';
import HomepageProjects from '../components/HomepageProjects'
import axios from 'axios';
import getSessionInfo from '../components/getSessionInfo';
import Loading from '../components/Loading';
import HomepageButtons from '../components/HomepageButtons';
import myStyles from './css/Landing.css';

/**
 * @author utkarsh867
 * The Home page of the project
 */
class Landing extends Component {
    state = {
        username: "",
        verifiedUser: false,
        isLoggedIn: false,
        loading: true
    };

    componentWillMount(){
        this.props.history.push('/');
        getSessionInfo()
            .then(response => {
                if(response){
                    this.setState({
                        isLoggedIn: true,
                        username: response.fullName,
                        verifiedUser: response.isVerified
                    });
                }
                else{
                    this.setState({
                        username: "",
                        verifiedUser: false,
                        isLoggedIn: false
                    });
                }
                this.setState({
                    loading: false
                })
            });
    }

    requestLogout = async() => {
        try{
            const response = await axios.get('/api/logout', {withCredentials:true});
            return response.data.success;
        }
        catch(e){
            //Handle error
        }
    };

    logOutUser = () => {
        if(this.requestLogout()){
            this.setState({
                username: "",
                verifiedUser: false,
                isLoggedIn: false
            });
        }
    };

    render() {
        if(this.state.loading){
            return(
                <div className={'vertical-center justify-content-center'} style={{width: "100%"}}>
                    <Loading/>
                </div>
            )
        }
        return (
            <div className={'container-fluid'}>
                <div className={'row'} style={styles.homepageBanner}>
                    <div style={styles.overlayBanner}>
                        <div className={'container'} style={styles.homepageContent}>
                            <Header
                                isLoggedIn={this.state.isLoggedIn}
                                username={this.state.username}
                                verifiedUser={this.state.verifiedUser}
                                onLogout={this.logOutUser}/>
                            <div className={'row'} style={styles.homepageBannerText}>
                                <h2 style={{marginTop:"1rem"}}>
                                    Discover, present and collaborate on student projects all over HKU
                                </h2>
                            </div>
                            <div className={'row d-flex justify-content-center'} style={styles.homepageBannerRows}>
                                <a href={'#projects'}>
                                    <button
                                        className={'btn ExploreButton'}
                                        style={styles.homepageBannerButton}
                                    >
                                        EXPLORE PROJECTS
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={'row'}
                    style={{backgroundColor: "#FEFEFE"}}
                >
                    <div className={'container'}>
                        <div
                            className={'row'}
                            style={styles.homepageContentRows}
                        >
                            <div style={styles.flexColumn} className={'col-lg-8 col-sm-12 ml-auto mr-auto'}>
                                <div>
                                  <h2>Looking for teammates in HKU to startup your great idea?</h2>
                                  <p>
                                      Post your great ideas for everyone to review. Get connected with students who are
                                      interested  in your project and get a chance to collaborate with them.
                                  </p>
                                </div>

                                <HomepageButtons text="Advertise your project" link = "/newproject"/>
                            </div>
                            <div className={'col-lg-4 col-sm-12 ml-auto mr-auto'}>
                                <img src={require('../imgs/homeilloteam.png')} style={{width: "100%", padding: "10px"}}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={'row'}
                    style={{backgroundColor: "#F7F7F7"}}
                >
                    <div className={'container'}>
                        <div
                            className={'row'}
                            style={styles.homepageContentRows}
                        >
                            <div className={'col-lg-4 col-sm-12'}>
                                <img src={require('../imgs/homeprojects.png')} style={{width: "100%", padding: "10px"}}/>
                            </div>

                            <div className={'col-lg-8 col-sm-12'}>
                                <h2>Finding projects to collaborate on right here in HKU?</h2>
                                <p>
                                    Find projects that interest you the most and contact the coordinator from right here.
                                    Still exploring? Go ahead and search from the whole catalog of projects.
                                </p>
                                <HomepageButtons text="Find a project" link = "#projects"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={'row'}
                    style={{backgroundColor: "#F7F7F7"}}
                >
                    <div className={'container'}>
                        <div
                            className={'row'}
                            style={styles.homepageContentRows}
                        >
                            <HomepageProjects/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    homepageBanner: {
        backgroundImage: `url(${require('../imgs/homepage.png')})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        margin: "0"
    },
    overlayBanner: {
        backgroundColor: "rgba(90,79,255, 0.7)",
        width: "100%",
    },
    homepageBannerText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: "20px",
        lineHeight: "48px",
        marginTop: "50px"
    },
    homepageBannerButton: {
        backgroundColor: "white",
        backgroundImage: "none",
        color: "#3F5EDD",
        borderColor: "white",
        fontSize: "18px",
        lineHeight: "21px",
        fontWeight: "bold",
        paddingTop: "22px",
        paddingBottom: "22px",
        paddingLeft: "42px",
        paddingRight: "42px",
        marginBottom:"1rem"
    },
    homepageBannerRows: {
        paddingTop: "30px",
        paddingBottom: "30px"
    },
    homepageContent: {
        maxWidth: "960px"
    },
    homepageContentRows: {
        padding: "60px 30px"
    },
    homepageBannerMinorText: {
        fontSize: "24px",
        lineHeight: "28px",
        fontWeight: "100",
        color: "rgb(135, 126, 214)"
    },
    flexColumn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-evenly"
    }
};

export default Landing;
