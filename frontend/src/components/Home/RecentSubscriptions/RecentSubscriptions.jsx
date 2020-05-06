import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import Section from '../Section/Section';
import Item from './Item/Item';

const RecentSubscriptions = ({subscriptions}) => {
    return (
        <Section name={`${subscriptions.length} Most Recent Subscriptions`}>
            <List>
                {subscriptions.map((item, index) => (
                  <Item key={index} item={item} />
                ))}
            </List>
        </Section>
    );
};

RecentSubscriptions.prototype = {
    subscriptions: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.shape({
            content_id: PropTypes.number,
            title: PropTypes.string,
            preview_poster_url: PropTypes.string,
        }),
        subscription_date: PropTypes.string,
    })),
};

export default RecentSubscriptions;
