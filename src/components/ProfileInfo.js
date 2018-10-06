import React from 'react';

const ProfileInfo = (props) => {
    const { user } = props;
    return(
        <div style={styles.profileContainer} className={'container'}>
            <div className={'row'}>
                <div id={'profileImage'} className={'col-2 align-items-center'}>
                    <img className="rounded-circle" style={styles.profilePicture} src={"https://api.adorable.io/avatars/"+user.emailId}/>
                </div>
                <div id={'details'} className={'col-9'}>
                    <h2 style={styles.details.fullname}>{user.fullName}</h2>
                    <h3 style={styles.details.email}>{user.emailId}</h3>
                </div>
            </div>
        </div>
    );
};

const styles  = {
    profileContainer: {
        marginTop: "30px",
        marginBottom: "30px",
        paddingTop: "20px",
        paddingBottom: "20px",
    },
    profilePicture: {
        width: "70%"
    },
    formFields: {
        marginTop: '30px'
    },
    details: {
        fullname: {
            fontSize: "24px",
            fontWeight: "400",
        },
        email: {
            fontSize: "14px",
            fontWeight: "100",
            color: "#7C7B8A"
        }
    }
};

export default ProfileInfo;