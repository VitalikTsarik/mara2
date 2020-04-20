import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './UserStatus.scss'

import { useAuth } from '../../../context/auth/AuthContext';

const UserStatus = () => {
    const {user, logout} = useAuth();
    return (
        <div className={styles.userStatus}>
            <div className={styles.userStatus_username}>
                {user && user.username}
            </div>
            <Button
                className={styles.userStatus_logOut}
                variant={'outlined'}
                color={'secondary'}
                size={'small'}
                onClick={logout}
            >
                Logout</Button>
        </div>
    );
};

export default UserStatus;
