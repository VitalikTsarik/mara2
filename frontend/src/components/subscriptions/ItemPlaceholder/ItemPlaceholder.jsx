import React from 'react';
import ContentLoader from 'react-content-loader';

const itemHeight = 350;
const itemWidth = 250;

const ItemPlaceholder = () => {
    return (
        <ContentLoader
            width={itemWidth}
            height={itemHeight}
            backgroundColor={'#313236'}
            foregroundColor={'#50535a'}
        >
            <rect
                width={itemWidth}
                height={itemHeight}
            />
        </ContentLoader>
    );
};

export default ItemPlaceholder;
