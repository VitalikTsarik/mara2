import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import qs from 'qs';

import layout from '../styles/layout.scss';

import Header from './Header/Header';
import { DataProvider } from './common/DataProvider/DataProvider';
import { ApiUrls, getSearchUrl, getTitleApiUrl } from './common/DataProvider/urls';
import PrivateRoute from './common/PrivateRoute/PrivateRoute';
import { getHomeUrl, RouterUrls } from './common/urls';
import Title from './Title/Title';
import List from './subscriptions/List/List';
import Page404 from './Page404/Page404';
import Login from './accounts/Login/Login';
import Register from './accounts/Register/Register';
import { AuthProvider } from '../context/auth/AuthContext';
import { defaultTheme } from '../context/theme';
import Search from './Search/Search';
import SearchSkeleton from './skeletons/SearchSkeleton/SearchSkeleton';
import Home from './Home/Home';


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
                                <DataProvider
                                    key={getHomeUrl()}
                                    url={ApiUrls.HOME}
                                    render={(data) => <Home data={data} />}
                                />
                            </Route>
                            <Route
                                path={RouterUrls.TITLE}
                                render={({match}) => {
                                    const url = getTitleApiUrl(match.params.id);
                                    return (
                                        <DataProvider
                                            key={url}
                                            url={url}
                                            render={(data) => <Title data={data} />}
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
                                            skeleton={<SearchSkeleton count={5} />}
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
