import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth } from '../../../context/auth/AuthContext';
import { RouterUrls } from '../urls';

const PrivateRoute = ({render, ...rest}) => {
    const {isAuthorized} = useAuth();
    return (
        <Route {...rest} render={(props) => (
            isAuthorized ? render(props) : <Redirect to={RouterUrls.LOGIN} />
        )} />
    );
};

PrivateRoute.propTypes = {
    render: PropTypes.func,
};

export default PrivateRoute;
