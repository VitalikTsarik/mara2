import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import styles from './Item.scss';

import Info from '../../common/Info/Info';
import { getTvShowUrl } from '../../common/urls';

const Item = ({item}) => {
    const history = useHistory();

    const handleClick = useCallback(() => {
        history.push(getTvShowUrl(item.content_id));
    }, [item.content_id]);

    return (
        <div
            className={styles.item}
            onClick={handleClick}
        >
            <img
                className={styles.item_poster}
                src={item.poster_url}
                alt={item.title}
            />
            <div className={styles.item_summary}>
                <div className={styles.item_title}>
                    {item.title}
                </div>
                <div className={styles.item_info}>
                    <Info
                        dataMap={{
                            seasons: item.seasons,
                            year: item.year,
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
        poster_url: PropTypes.string,
        year: PropTypes.string,
    }).isRequired
};

export default Item;
