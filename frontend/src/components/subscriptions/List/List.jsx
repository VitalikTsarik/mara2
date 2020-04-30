import React, { useCallback, useMemo, useState } from 'react';

import styles from './List.scss';

import Item from '../Item/Item';
import Placeholder from '../../skeletons/Placeholder/Placeholder';

const itemHeight = 350;
const itemWidth = 250;

const List = ({data}) => {
    if (!data) {
        return null;
    }

    const skeleton = useMemo(() => (
        <Placeholder
            width={itemWidth}
            height={itemHeight}
        />
    ), []);

    return (
        <div className={styles.list}>
            {data.map((item) => (
                    <div
                        className={styles.item}
                        key={item.content_id}
                    >
                        <Item
                            item={item}
                            skeleton={skeleton}
                        />
                    </div>
                )
            )}
        </div>
    );
};

export default List;
