import React from 'react';

const styles ={
    jumbotronStyle: {
        backgroundColor: 'white'
    },
    formFields: {
        marginTop: '30px'
    }
};

const ProfileInfo = (props) => {
    const { user } = props;
    return(
        <div className={'personal-info-box row'}>
            <div style={styles.jumbotronStyle} className={'jumbotron col-lg-10 offset-lg-1'}>
                <h2>My Profile</h2>
                <hr className={'my-4'}/>
                <h3>Personal Information</h3>
                <div style={styles.formFields} className={'container-fluid'}>
                    <fieldset disabled>
                        <div className="form-group row">
                            <label htmlFor="fullName" className="col-2 col-form-label">Full Name</label>
                            <div className="col-10">
                                <input className="form-control" type="text" value={user.fullName} id="fullName"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email" className="col-2 col-form-label">Email ID: </label>
                            <div className="col-10">
                                <input className="form-control" type="email" value={user.emailId} id="email"/>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};


export default ProfileInfo;