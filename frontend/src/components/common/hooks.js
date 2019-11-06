import { useCallback, useEffect } from 'react';

const useClickOutside = (element, callback, enabled = true, target = document) => {
    if (!enabled || !element)
        return;

    const handleClickOutside = useCallback((event) => {
        if (element.current && !element.current.contains(event.target)) {
            callback(event);
        }
    }, [callback, element]);

    useEffect(() => {
        target.addEventListener('click', handleClickOutside);
        return () => target.removeEventListener('click', handleClickOutside);
    }, [handleClickOutside, target]);
};

export default useClickOutside;
