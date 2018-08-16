import React  from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import myStyles from './css/HomepageButtons.css';

const HomepageButtons = ({text, link}) => {
    return(
        <Link to={link}>
            <button className={'btn Button'} style={styles.homepageButtons}>
                {text}
            </button>
        </Link>
    );
};

const styles = {
    homepageButtons: {
        backgroundColor: "transparent",
        backgroundImage: "none",
        color: "#5A4FFF",
        borderColor: "#5A4FFF",
        fontSize: "18px",
        fontWeight: "bold"
    }
};

HomepageButtons.propTypes = {
    text: PropTypes.string,
    link: PropTypes.string
};

export default HomepageButtons;