import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Item.scss';

import SubButton from '../../common/SubButton/SubButton';
import { subscribe } from '../../../actions/subscriptions';

const Item = ({item: {content_id, title, poster_url}, onUnsub, skeleton}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const onLoad = useCallback(() => {
        setIsLoaded(true);
    }, []);

    const handleSubBtnClick = useCallback(async () => {
        return await subscribe(content_id).then(() => onUnsub());
    }, [content_id, onUnsub]);

    return (
        <div className={styles.item}>
            {!isLoaded && skeleton}
            <img
                style={isLoaded ? {} : {display: 'none'}}
                className={styles.bgPoster}
                src={poster_url}
                alt={title}
                onLoad={onLoad}
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
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
        </div>
    );
};

Item.propTypes = {
    item: PropTypes.object.isRequired,
    onUnsub: PropTypes.func.isRequired,
};

export default Item;
