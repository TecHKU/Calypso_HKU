import React from 'react';
import {Link} from 'react-router-dom'

const YouHaveBeenLoggedOut = () =>{
        return (
            <div className={'container-fluid'} style={{width: '100%'}}>
                <div className={'vertical-center'} style={{width: '100%'}}>
                    <div style={{textAlign: 'center', width: '100%'}}>
                        <h3 style={{textAlign: 'center', width: '100%'}}>You have been logged out<br/></h3>
                        <Link to={'/login'} ><h2 style={{textAlign: 'center', width: '100%'}}>Login</h2></Link>
                    </div>
                </div>
            </div>
        );
};

export default YouHaveBeenLoggedOut;