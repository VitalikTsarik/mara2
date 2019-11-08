import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './Header.scss';
import layout from '../../styles/layout.scss';

import Logo from './logo.png';
import SearchBar from './SearchBar/SearchBar';
import { RouterUrls, getHomeUrl } from '../common/urls';

const Header = () => {
    return (
        <nav className={classNames(styles.header, layout.container)}>
            {/*<img className={styles.header_logo} src='/static/logo.png'/>*/}
            <img className={styles.header_logo} src={Logo} alt='logo' />
            <div className={styles.header_navBar}>
                <NavLink
                    className={styles.header_item}
                    activeClassName={styles.header_item__active}
                    exact to={getHomeUrl()}
                >
                    Home
                </NavLink>
                <NavLink
                    className={styles.header_item}
                    activeClassName={styles.header_item__active}
                    exact to={RouterUrls.SUBSCRIPTIONS}
                >
                    List
                </NavLink>
            </div>
            <div className={styles.header_searchBar}>
                <SearchBar onSubmit={(value) => console.log(value)} />
            </div>
        </nav>
    );
};

export default Header;
