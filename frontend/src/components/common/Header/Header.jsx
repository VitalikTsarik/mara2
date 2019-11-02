import React from 'react';
import classNames from 'classnames'

import Logo from './logo.png'

import styles from './Header.scss';

const Header = () => {
    return (
        <nav className={styles.header}>
            {/*<img className={styles.header_logo} src='/static/logo.png'/>*/}
            <img className={styles.header_logo} src={Logo}/>
            <ul className={styles.header_navBar}>
                <li className={styles.header_item}>Home</li>
                <li className={styles.header_item}>List</li>
            </ul>
        </nav>
    );
};

export default Header;
