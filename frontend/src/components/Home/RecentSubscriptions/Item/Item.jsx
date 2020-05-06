import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import styles from './Item.scss';

import { getTitleUrl } from '../../../common/urls';

const Item = ({item}) => {
    const {content_id, title, preview_poster_url} = item.content;
    const history = useHistory();
    const handleClick = useCallback(() => history.push(getTitleUrl(content_id)), []);
    return (
        <ListItem button onClick={handleClick}>
            <ListItemIcon>
                <img
                    className={styles.poster}
                    src={preview_poster_url}
                    alt={title}
                />
            </ListItemIcon>
            <ListItemText
                className={styles.info}
                primary={title}
                secondary={item.subscription_date}
            />
        </ListItem>
    );
};

Item.propTypes = {
    item: PropTypes.shape({
        content: PropTypes.shape({
            content_id: PropTypes.number,
            title: PropTypes.string,
            preview_poster_url: PropTypes.string,
        }),
        subscription_date: PropTypes.string,
    })
};

export default Item;
