import React, { useCallback, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './SearchBar.scss';

import Lens from './lens.png';
import useIsExtended from './hooks';

const SearchBar = ({onSubmit}) => {
    const searchBar = useRef(null);
    const input = useRef(null);

    const isExtended = useIsExtended(searchBar, input);

    const onLensClick = useCallback(() => {
        if (isExtended) {
            onSubmit(input.current.value);
        }
    }, [isExtended]);

    return (
        <div className={styles.searchBar} ref={searchBar}>
            <input
                className={classNames(
                    styles.input,
                    isExtended && styles.input__extended,
                )}
                ref={input}
                type='text'
                name='search_input'
                placeholder='Search...'
            />
            <img className={styles.icon} src={Lens} alt='lens' onClick={onLensClick} />
        </div>
    );
};

SearchBar.propTypes = {
    onSubmit: PropTypes.func,
};

export default SearchBar;
