import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './SubButton.scss';

const SubButton = ({onClick, isSub}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSuccess, setIsSuccess] = useState(null);

    const handleClick = useCallback(() => {
        setIsLoading(true);
        onClick().then(() => {
            setIsSuccess(true);
        })
            .catch(() => {
                setIsSuccess(false);
            })
            .finally(() => {
                setIsLoaded(true);
                setTimeout(() => setIsLoaded(false));
            });
    }, [isLoaded]);

    return (
        <div
            className={classNames(
                styles.subButton,
                isLoading && styles.animate,
                isSuccess ? styles.success : styles.error,
            )}
            onClick={handleClick}
        >
            {isSub ? 'Unsubscribe' : 'Subscribe'}
        </div>
    );
};

SubButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SubButton;
