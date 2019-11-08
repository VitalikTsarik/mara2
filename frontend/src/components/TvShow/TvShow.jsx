import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './TvShow.scss';
import SubButton from '../common/SubButton/SubButton';

let a = {
    content_id: 2,
    title: 'Better Call Saul',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BMTAxOTQ0MjUzMzJeQTJeQWpwZ15BbWU4MDY0NTAxNzMx._V1_SY150_CR0,0,101,150_.jpg',
    'seasons': 5,
    'runtime': '00:46:00',
    'genres': 'Crime, Drama',
    'year': '2015',
    'years': '2015-',
    'is_airing': false
};


const TvShow = ({
                    data: {
                        contentId,
                        title,
                        posterUrl,
                        seasons,
                        runtime,
                        genres,
                        year,
                        years,
                        isAiring
                    }
                }) => {
    return (
        <div>
            <p>{title}</p>
        </div>
    );
};

TvShow.propTypes = {
    data: PropTypes.object.isRequired,
};

export default TvShow;
