import React from 'react';

import styles from './List.scss';

import Item from '../Item/Item';

const List = ({data}) => {
    return (
        <div className={styles.list}>
            {data.map((item) => (
                    <div className={styles.item}>
                        <Item
                            key={item.content_id}
                            item={item}
                        />
                    </div>
                )
            )}
        </div>
    );
};

export default List;
