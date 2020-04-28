import React, { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import InfiniteScroll from 'react-infinite-scroller';

import styles from './Search.scss';

import Results from './Results/Results';
import { getNextChunk } from '../../actions/search';

const Search = ({data}) => {
    const [items, setItems] = useState(data);
    const [chunksLoaded, setChunksLoaded] = useState(1);
    const [hasMore, setHasMore] = useState(Boolean(items.length));

    const location = useLocation();
    const searchQuery = useMemo(() => {
        const {q} = qs.parse(location.search, {ignoreQueryPrefix: true});
        return q;
    }, [location.search]);

    const handleLoadMore = useCallback(async () => {
        const chunk = await getNextChunk(searchQuery, chunksLoaded + 1);
        if (chunk && chunk.length) {
            setItems((prev) => [...prev, ...chunk]);
            setChunksLoaded((prev) => prev + 1);
        } else {
            setHasMore(false);
        }
    }, [chunksLoaded, searchQuery]);

    return (
        <InfiniteScroll
            loadMore={handleLoadMore}
            hasMore={hasMore}
            loader={<div key={'loading'}>Loading ...</div>}
        >
            <div className={styles.search}>
                <Results items={items} />
            </div>
        </InfiniteScroll>
    );
};

export default Search;
