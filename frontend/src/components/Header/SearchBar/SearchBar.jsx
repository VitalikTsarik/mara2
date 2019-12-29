import React, { useCallback, useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './SearchBar.scss';

import Lens from './lens.png';
import useClickOutside from '../../common/hooks';

const SearchBar = ({onSubmit}) => {
    const searchBarRef = useRef(null);
    const inputRef = useRef(null);

    const [isExtended, setIsExtended] = useState(false);

    const handleClickInside = useCallback(() => {
        if (searchBarRef.current && inputRef.current) {
            setTimeout(() => {
                setIsExtended(true);
                inputRef.current.focus();
            });
        }
    }, [searchBarRef, inputRef, setIsExtended]);

    const handleClickOutside = useCallback((event) => {
        if (searchBarRef.current && inputRef.current && !searchBarRef.current.contains(event.target)) {
            setIsExtended(false);
            inputRef.current.blur();
        }
    }, [searchBarRef, inputRef]);

    useEffect(() => {
        searchBarRef.current.addEventListener('click', handleClickInside);
        return () => searchBarRef.current.removeEventListener('click', handleClickInside);
    });

    useClickOutside(searchBarRef, handleClickOutside);

    const onLensClick = useCallback(() => {
        if (isExtended) {
            onSubmit(inputRef.current.value);
        }
    }, [isExtended, inputRef]);

    const handleKeyPress = useCallback((event) => {
        if (event.key === 'Enter') {
            onSubmit(inputRef.current.value);
        }
    });

    return (
        <div
            className={classNames(
                styles.searchBar,
                isExtended && styles.searchBar__extended
            )}
            ref={searchBarRef}
        >
            <input
                className={classNames(
                    styles.input,
                    isExtended && styles.input__extended,
                )}
                ref={inputRef}
                type='text'
                name='search_input'
                placeholder='Search...'
                onKeyDown={handleKeyPress}
            />
            <img
                className={classNames(
                    styles.icon,
                    isExtended && styles.icon__extended
                )}
                src={Lens}
                alt='lens'
                onClick={onLensClick}
            />
        </div>
    );
};

SearchBar.propTypes = {
    onSubmit: PropTypes.func,
};

export default SearchBar;
