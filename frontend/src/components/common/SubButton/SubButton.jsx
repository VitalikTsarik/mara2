import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

import styles from './SubButton.scss';

import { subscribe } from '../../../actions/subscriptions';
import { useAuth } from '../../../context/auth/AuthContext';
import { RouterUrls } from '../urls';

const SubButtonSize = Object.freeze({
    MEDIUM: 'medium',
    SMALL: 'small',
});

const SubButton = ({
                       contentId,
                       onSubCallback,
                       isSub: initialIsSub,
                       size = SubButtonSize.MEDIUM,
                   }) => {
    const {isAuthorized} = useAuth();
    const history = useHistory();

    const [isSub, setIsSub] = useState(initialIsSub);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(null);

    const handleClick = useCallback(async (e) => {
        e.stopPropagation();
        if (isLoading) {
            return;
        }
        if (!isAuthorized) {
            history.push(RouterUrls.LOGIN);
        }

        setIsLoading(true);

        try {
            await subscribe(contentId);
            setIsSuccess(true);
            setIsSub((prev) => !prev);
            onSubCallback && onSubCallback();
        } catch (e) {
            setIsSuccess(false);
        } finally {
            setTimeout(() => setIsLoading(false), 5000);
        }
    }, [onSubCallback, isLoading]);

    return (
        <div className={styles.subButton}>
            <div
                className={classNames(
                    styles.subButton_button,
                    styles[`subButton_button__${size}`],
                    isLoading && [styles.animate, styles[`animate__${size}`]],
                    isSuccess ? [styles.success, styles[`success__${size}`]] : styles.error,
                )}
                onClick={handleClick}
            >
                {!isLoading && (isSub ? 'Unsubscribe' : 'Subscribe')}
            </div>
        </div>
    );
};

SubButton.propTypes = {
    contentId: PropTypes.number.isRequired,
    onSubCallback: PropTypes.func,
    isSub: PropTypes.bool.isRequired,
    size: PropTypes.oneOf(Object.values(SubButtonSize)),
};

export { SubButton, SubButtonSize };
