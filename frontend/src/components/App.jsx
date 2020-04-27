import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import qs from 'qs';

import layout from '../styles/layout.scss';

import Header from './Header/Header';
import { DataProvider } from './common/DataProvider/DataProvider';
import { ApiUrls, getSearchUrl, getTvShowApiUrl } from './common/DataProvider/urls';
import PrivateRoute from './common/PrivateRoute/PrivateRoute';
import { RouterUrls } from './common/urls';
import TvShow from './TvShow/TvShow';
import List from './subscriptions/List/List';
import Page404 from './Page404/Page404';
import Login from './accounts/Login/Login';
import Register from './accounts/Register/Register';
import { AuthProvider } from '../context/auth/AuthContext';
import { defaultTheme } from '../context/theme';
import Search from './Search/Search';


const App = () => {
    return (
        <AuthProvider>
            <MuiThemeProvider theme={defaultTheme}>
                <Router>
                    <Header />
                    <div className={layout.container}>
                        <Switch>
                            <PrivateRoute exact path={RouterUrls.SUBSCRIPTIONS} render={() => (
                                <DataProvider
                                    key={RouterUrls.SUBSCRIPTIONS}
                                    url={ApiUrls.SUBSCRIPTIONS}
                                    render={(data) => (<List data={data} />)}
                                />)}
                            />
                            <Route exact path={RouterUrls.HOME}>
                            </Route>
                            <Route
                                path={RouterUrls.TV_SHOW}
                                render={({match}) => {
                                    const url = getTvShowApiUrl(match.params.contentId);
                                    return (
                                        <DataProvider
                                            key={url}
                                            url={url}
                                            render={data => <TvShow data={data} />}
                                        />
                                    );
                                }}
                            />
                            <Route exact path={RouterUrls.LOGIN}>
                                <Login />
                            </Route>
                            <Route exact path={RouterUrls.REGISTER}>
                                <Register />
                            </Route>
                            <Route
                                exact
                                path={RouterUrls.SEARCH}
                                render={({location}) => {
                                    const {q} = qs.parse(location.search, {ignoreQueryPrefix: true});
                                    const url = getSearchUrl(q);
                                    return (
                                        <DataProvider
                                            key={url}
                                            url={url}
                                            render={data => <Search data={data} />}
                                        />
                                    );
                                }}
                            />
                            <Route path="*">
                                <Page404 />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </MuiThemeProvider>
        </AuthProvider>
    );
};

export default App;
