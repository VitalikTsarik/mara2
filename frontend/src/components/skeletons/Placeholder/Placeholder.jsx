import React from 'react';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';

import { backgroundColor, foregroundColor } from '../constants';

const Placeholder = ({width, height, title}) => {
    return (
        <ContentLoader
            width={width}
            height={height}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
            title={title}
        >
            <rect
                width={width}
                height={height}
            />
        </ContentLoader>
    );
};

Placeholder.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    title: PropTypes.string,
};

export default Placeholder;
