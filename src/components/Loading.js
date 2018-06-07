import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = {
    container: {
        position: 'relative',
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
};

const Loading = () => (
    <div className={'row'}>
        <div className={'col-4 offset-4'}>
            <div style={style.container}>
                <CircularProgress
                    size={100}
                    left={70}
                    top={0}
                    loadingColor="#FF9800"
                    status="loading"
                    style={style.refresh}
                />
            </div>
        </div>
    </div>
);

export default Loading;