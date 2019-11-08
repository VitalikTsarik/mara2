import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './Item.scss';
import SubButton from '../../common/SubButton/SubButton';

const Item = ({item: {title, posterUrl}}) => {
    const [isSubscribe, setIsSubscribe] = useState(true);

    const handleSubBtnClick = useCallback(() => {
        setTimeout(() => setIsSubscribe((prev) => !prev), 1000);
    }, [setIsSubscribe]);

    return (
        <div className={styles.item}>
            <img className={styles.bgPoster} src={posterUrl} alt='poster image' />
            <div className={styles.overlay} />
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.subBtn}>
                <SubButton
                    onClick={handleSubBtnClick}
                    isSub={isSubscribe}
                />
            </div>
        </div>
    );
};

Item.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Item;
