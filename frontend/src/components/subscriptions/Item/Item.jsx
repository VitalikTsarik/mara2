import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import styles from './Item.scss';

import SubButton from '../../common/SubButton/SubButton';
import { getTitleUrl } from '../../common/urls';

const Item = ({item: {content_id, title, poster_url}, skeleton}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const onLoad = useCallback(() => {
        setIsLoaded(true);
    }, []);

    const history = useHistory();
    const handleClick = useCallback(() => {
        history.push(getTitleUrl(content_id));
    }, [history]);

    return (
        <div
            className={styles.item}
            onClick={handleClick}
        >
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
                        contentId={content_id}
                        isSub={true}
                    />
                </div>
            </div>
        </div>
    );
};

Item.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Item;
