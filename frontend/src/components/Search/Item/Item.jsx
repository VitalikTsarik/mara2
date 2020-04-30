import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import styles from './Item.scss';

import Info from '../../common/Info/Info';
import { getTitleUrl } from '../../common/urls';
import Placeholder from '../../skeletons/Placeholder/Placeholder';

const Item = ({item}) => {
    const history = useHistory();

    const handleClick = useCallback(() => {
        history.push(getTitleUrl(item.content_id));
    }, [item.content_id]);

    const [isLoaded, setIsLoaded] = useState(false);
    const onLoad = useCallback(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div
            className={styles.item}
            onClick={handleClick}
        >
            {!isLoaded && (
                <Placeholder
                    height={350}
                    width={250}
                    title={item.title}
                />
            )}
            <img
                style={isLoaded ? {} : {display: 'none'}}
                className={styles.item_poster}
                src={item.poster_url}
                alt={item.title}
                onLoad={onLoad}
            />
            <div className={styles.item_summary}>
                <div className={styles.item_title}>
                    {item.title}
                </div>
                <div className={styles.item_info}>
                    <Info
                        dataMap={{
                            runtime: item.runtime,
                            seasons: item.seasons,
                            genres: item.genres,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

Item.propTypes = {
    item: PropTypes.shape({
        content_id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        seasons: PropTypes.number,
        poster_url: PropTypes.string.isRequired,
        genres: PropTypes.string.isRequired,
    }).isRequired
};

export default Item;
