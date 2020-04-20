import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import styles from './AuthorizationButtons.scss';

import { RouterUrls } from '../../common/urls';

const AuthorizationButtons = () => {
    const history = useHistory();

    const onLogIn = useCallback(() => {
        history.push(RouterUrls.LOGIN);
    }, []);
    const onSignUp = useCallback(() => {
        history.push(RouterUrls.REGISTER);
    }, []);

    return (
        <div className={styles.authorizationButtons}>
            <Button
                className={styles.authorizationButtons_button}
                variant={'outlined'}
                color={'secondary'}
                size={'medium'}
                onClick={onLogIn}
            >
                Log In
            </Button>
            <Button
                className={styles.authorizationButtons_button}
                variant={'contained'}
                color={'primary'}
                size={'medium'}
                onClick={onSignUp}
            >
                Sign up
            </Button>
        </div>
    );
};

export default AuthorizationButtons;
