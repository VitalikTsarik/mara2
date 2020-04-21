import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './SubButton.scss';
import { subscribe } from '../../../actions/subscriptions';

const SubButton = ({contentId, onSubCallback, isSub: initialIsSub}) => {
    const [isSub, setIsSub] = useState(initialIsSub);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(null);

    const handleClick = useCallback(async () => {
        if (isLoading) {
            return;
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
                    isLoading && styles.animate,
                    isSuccess ? styles.success : styles.error,
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
};

export default SubButton;
