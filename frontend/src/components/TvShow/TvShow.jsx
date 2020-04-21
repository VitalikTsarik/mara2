import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import styles from './TvShow.scss';

import SubButton from '../common/SubButton/SubButton';
import Tooltip from '../common/Tooltip/Tooltip';
import { subscribe } from '../../actions/subscriptions';
import Placeholder from '../common/Placeholder/Placeholder';

const TvShow = ({
                    data:
                        {
                            content_id,
                            title,
                            poster_url,
                            seasons,
                            runtime,
                            genres,
                            year,
                            years,
                            isAiring,
                            isSubscribed,
                        }
                }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const onLoad = useCallback(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className={styles.tvShow}>
            <div>
                {!isLoaded && (
                    <Placeholder
                        width={400}
                        height={500}
                        title={title}
                    />
                )}
                <img
                    style={isLoaded ? {} : {display: 'none'}}
                    className={styles.poster}
                    src={poster_url}
                    alt='poster'
                    onLoad={onLoad}
                />
                <div className={styles.subBtn}>
                    <SubButton
                        contentId={content_id}
                        isSub={isSubscribed}
                    />
                </div>
            </div>
            <div className={styles.overview}>
                <div className={styles.title}>
                    {title} ({year})
                    <Tooltip
                        content={'Airing Status'}
                    >
                        <div className={classNames(
                            styles.circle,
                            isAiring && styles.circle__active,
                        )}
                        />
                    </Tooltip>
                </div>
                <div className={styles.info}>
                    <div className={styles.infoName}>seasons</div>
                    <div className={styles.infoContent}>{seasons}</div>
                    <div className={styles.infoName}>runtime</div>
                    <div className={styles.infoContent}>{runtime}</div>
                    <div className={styles.infoName}>genres</div>
                    <div className={styles.infoContent}>{genres}</div>
                    <div className={styles.infoName}>years</div>
                    <div className={styles.infoContent}>{years}</div>
                </div>
            </div>
        </div>
    );
};

export default TvShow;
