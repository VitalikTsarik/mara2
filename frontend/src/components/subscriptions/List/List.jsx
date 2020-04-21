import React, { useCallback, useMemo, useState } from 'react';

import styles from './List.scss';

import Item from '../Item/Item';
import ItemPlaceholder from '../ItemPlaceholder/ItemPlaceholder';

const List = ({data}) => {
    if (!data) {
        return null;
    }

    const [items, setItems] = useState(data);

    const removeItem = (id) => useCallback(() => {
        setItems(items.filter((item) => {
            return item.content_id !== id;
        }));
    }, [items]);

    const skeleton = useMemo(() => <ItemPlaceholder />, []);

    return (
        <div className={styles.list}>
            {items.map((item) => (
                    <div
                        className={styles.item}
                        key={item.content_id}
                    >
                        <Item
                            item={item}
                            onUnsub={() => removeItem(item.content_id)}
                            skeleton={skeleton}
                        />
                    </div>
                )
            )}
        </div>
    );
};

export default List;
