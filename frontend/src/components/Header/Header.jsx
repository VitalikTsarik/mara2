import React from 'react';
import classNames from 'classnames';

import styles from './Header.scss';
import layout from '../../styles/layout.scss';

import Logo from './logo.png';
import SearchBar from './SearchBar/SearchBar';

const Header = () => {
    return (
        <nav className={classNames(styles.header, layout.container)}>
            {/*<img className={styles.header_logo} src='/static/logo.png'/>*/}
            <img className={styles.header_logo} src={Logo} alt='logo' />
            <ul className={styles.header_navBar}>
                <li className={styles.header_item}>Home</li>
                <li className={styles.header_item}>List</li>
            </ul>
            <SearchBar onSubmit={(value) => console.log(value)}/>
        </nav>
    );
};

export default Header;
