import React from 'react';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';

const Placeholder = ({width, height, title}) => {
    return (
        <ContentLoader
            width={width}
            height={height}
            backgroundColor={'#313236'}
            foregroundColor={'#50535a'}
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
