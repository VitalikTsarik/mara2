import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';

import { backgroundColor, foregroundColor } from '../constants';

const SearchSkeleton = ({count}) => {
    const items = [];
    const gap = 25;
    const width = 250;
    const height = 350;
    const topMargin = 30;
    const summaryMargin = 20;

    for (let i = 0; i < count; ++i) {
        const y = i * (height + gap) + topMargin;
        items.push(
            <Fragment key={i}>
                <rect
                    x={0}
                    y={y}
                    width={width}
                    height={height}
                />
                <rect
                    x={width + summaryMargin}
                    y={y}
                    width={300}
                    height={25}
                    rx={10}
                />
                <rect
                    x={width + summaryMargin}
                    y={y + 45}
                    width={200}
                    height={15}
                    rx={10}
                />
                <rect
                    x={width + summaryMargin}
                    y={y + 75}
                    width={200}
                    height={15}
                    rx={10}
                />
                <rect
                    x={width + summaryMargin}
                    y={y + 105}
                    width={200}
                    height={15}
                    rx={10}
                />
            </Fragment>
        );
    }

    return (
        <ContentLoader
            width={'100%'}
            height={count * (height + gap)}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
        >
            {items}
        </ContentLoader>
    );
};

export default SearchSkeleton;
