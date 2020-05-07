import React, { useCallback, useState } from 'react';

import styles from './Title.scss';

import { SubButton } from '../common/SubButton/SubButton';
import Placeholder from '../skeletons/Placeholder/Placeholder';
import Info from '../common/Info/Info';

const Title = ({
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
                           is_subscribed,
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
                        isSub={is_subscribed}
                    />
                </div>
            </div>
            <div className={styles.overview}>
                <div className={styles.title}>
                    {title} ({year})
                </div>
                <div className={styles.info}>
                    <Info
                        dataMap={{
                            seasons: seasons,
                            runtime: runtime,
                            genres: genres,
                            years: years,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Title;
