import React from 'react';
import PropTypes from 'prop-types';

import RecentSubscriptions from './RecentSubscriptions/RecentSubscriptions';

const Home = ({data}) => {
    return (
        <div>
            <RecentSubscriptions subscriptions={data.subscriptions} />
        </div>
    );
};

Home.propTypes = {
    data: PropTypes.shape({
        subscriptions: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.shape({
                content_id: PropTypes.number,
                title: PropTypes.string,
                preview_poster_url: PropTypes.string,
            }),
            subscription_date: PropTypes.string,
        })),
    })
};

export default Home;
