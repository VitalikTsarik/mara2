import React from 'react';

import Item from '../Item/Item';

const List = ({data}) => {
    return (
        <div>
            {data.map((item) => (
                    <Item
                        key={item.content_id}
                        item={item}
                    />
                )
            )}
        </div>
    );
};

export default List;
