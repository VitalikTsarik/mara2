import React, { useCallback } from 'react';
import classNames from 'classnames';
import { NavLink, useHistory } from 'react-router-dom';

import styles from './Header.scss';
import layout from '../../styles/layout.scss';

import Logo from './logo.png';
import SearchBar from './SearchBar/SearchBar';
import { RouterUrls, getHomeUrl, getSearchUrl } from '../common/urls';
import { useAuth } from '../../context/auth/AuthContext';
import AuthorizationButtons from './AuthorizationButtons/AuthorizationButtons';
import UserStatus from './UserStatus/UserStatus';

const Header = () => {
    const {isAuthorized} = useAuth();

    const history = useHistory();
    const handleSearchSubmit = useCallback((value) => {
        history.push(getSearchUrl(value));
    }, []);

    return (
        <nav className={classNames(styles.header, layout.container)}>
            <div className={styles.header_items}>
                <img className={styles.header_logo} src={Logo} alt='logo' />
                <div className={styles.header_navBar}>
                    <NavLink
                        className={styles.header_item}
                        activeClassName={styles.header_item__active}
                        exact to={getHomeUrl()}
                    >
                        Home
                    </NavLink>
                    {isAuthorized && (
                        <NavLink
                            className={styles.header_item}
                            activeClassName={styles.header_item__active}
                            exact to={RouterUrls.SUBSCRIPTIONS}
                        >
                            List
                        </NavLink>
                    )}
                </div>
                <div className={styles.header_searchBar}>
                    <SearchBar onSubmit={handleSearchSubmit} />
                </div>
            </div>
            {isAuthorized ? <UserStatus /> : <AuthorizationButtons />}
        </nav>
    );
};

export default Header;
