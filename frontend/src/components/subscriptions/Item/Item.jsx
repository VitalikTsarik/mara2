import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './Item.scss';
import SubButton from '../../common/SubButton/SubButton';
import { subscribe } from '../../../actions/subscriptions';

const Item = ({item: {content_id, title, preview_poster_url}}) => {
    const handleSubBtnClick = useCallback(async () => {
        return await subscribe(content_id);
    }, [content_id]);

    return (
        <div className={styles.item}>
            <img className={styles.bgPoster} src={preview_poster_url} alt='poster image' />
            <div className={styles.overlay} />
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.subBtn}>
                <SubButton
                    onClick={handleSubBtnClick}
                    isSub={true}
                />
            </div>
        </div>
    );
};

Item.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Item;
