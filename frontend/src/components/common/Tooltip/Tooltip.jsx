import React from 'react';

import styles from './Tooltip.scss';

const Tooltip = ({content, children}) => {
    return (
        <div className={styles.tooltip}>
            {children}
            <div className={styles.content}>{content}</div>
        </div>
    );
};

export default Tooltip;
