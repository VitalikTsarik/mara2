import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import styles from './Info.scss';

const Info = ({dataMap}) => {
    return (
        <div className={styles.info}>
            {Object.entries(dataMap).map(([name, content]) => (content && (
                <Fragment key={name}>
                    <div className={styles.info_name}>
                        {name}
                    </div>
                    <div className={styles.info_content}>
                        {content}
                    </div>
                </Fragment>
            )))}
        </div>
    );
};

Info.propTypes = {
    dataMap: PropTypes.object.isRequired,
};

export default Info;
