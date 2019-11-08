import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const useData = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw Error('Error Fetch');
            }
        }).then(data => {
            setData(data);
            setError(null);
            setIsLoading(false);
        }).catch(error => {
            setError(error);
        });
    }, [url, setIsLoading, setData, setError]);

    return {data, isLoading, error};
};

const DataProvider = ({url, render, errorMessage}) => {
    const {data, isLoading, error} = useData(url);

    if (error) {
        return <p>{errorMessage}</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return <>{render(data)}</>;
};

DataProvider.propTypes = {
    url: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
};

DataProvider.defaultProps = {
    errorMessage: 'Error Loading Data',
};

export { DataProvider, useData };
