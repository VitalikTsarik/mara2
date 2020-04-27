import React from 'react';

import styles from './Results.scss';

import Item from '../Item/Item';

const Results = ({items}) => {
    return (
        <div className={styles.results}>
            {items.length ? items.map((item) => (
                <Item key={item.content_id} item={item} />
            )) : (
                <div className={styles.results_notFound}>
                    No results found
                </div>
            )}
        </div>
    );
};

export default Results;
