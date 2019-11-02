import React, { useEffect, useState, useCallback } from 'react';

const useIsExtended = (searchBarRef, inputRef) => {
    const [isExtended, setIsExtended] = useState(false);

    const handleClickInside = useCallback(() => {
        if (searchBarRef.current && inputRef.current) {
            setTimeout(() => {
                setIsExtended(true);
                inputRef.current.focus();
            });
        }
    }, []);

    const handleClickOutside = useCallback((event) => {
        if (searchBarRef.current && inputRef.current && !searchBarRef.current.contains(event.target)) {
            setIsExtended(false);
            inputRef.current.blur();

        }
    }, []);

    useEffect(() => {
        searchBarRef.current.addEventListener('click', handleClickInside);
        return () => {
            searchBarRef.current.removeEventListener('click', handleClickInside);
        };
    });

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    return isExtended;
};

export default useIsExtended;
