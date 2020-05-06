import React from 'react';
import PropTypes from 'prop-types';

import styles from './Section.scss';

const Section = ({name, children}) => {
    return (
        <div className={styles.section}>
            {name && <div className={styles.name}>{name}</div>}
            {children}
        </div>
    );
};

Section.propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
};

export default Section;
