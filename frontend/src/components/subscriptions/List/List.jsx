import React from 'react';

import styles from './List.scss';

import Item from '../Item/Item';

const List = ({data}) => {
    if (!data) {
        return null;
    }

    return (
        <div className={styles.list}>
            {data.map((item) => (
                    <div
                        className={styles.item}
                        key={item.content_id}
                    >
                        <Item item={{...item, is_subscribed: true}} />
                    </div>
                )
            )}
        </div>
    );
};

export default List;
