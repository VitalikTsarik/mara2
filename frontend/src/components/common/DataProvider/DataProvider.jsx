import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withAuthorization } from '../../../actions/auth';

const useData = (url, isPrivate) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    let requestObj = {
        method: 'get',
    };
    if (isPrivate) {
        requestObj = withAuthorization(requestObj);
    }

    useEffect(() => {
        fetch(url, requestObj).then(res => {
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
    }, [url]);

    return {data, isLoading, error};
};

const DataProvider = ({
                          url,
                          isPrivate,
                          render,
                          errorMessage,
                          skeleton = <p>Loading...</p>
}) => {
    const {data, isLoading, error} = useData(url, isPrivate);

    if (error) {
        return <p>{errorMessage}</p>;
    }

    if (isLoading) {
        return skeleton;
    }

    return <>{render(data)}</>;
};

DataProvider.propTypes = {
    url: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    isPrivate: PropTypes.bool,
    skeleton: PropTypes.element,
};

DataProvider.defaultProps = {
    isPrivate: false,
};

DataProvider.defaultProps = {
    errorMessage: 'Error Loading Data',
};

export { DataProvider, useData };
