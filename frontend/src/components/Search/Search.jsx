import React from 'react';

import styles from './Search.scss';

import Results from './Results/Results';

const Search = ({data}) => {
    return (
        <div className={styles.search}>
            <Results items={data} />
        </div>
    );
};

export default Search;
