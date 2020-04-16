import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';

import layout from '../styles/layout.scss';

import Header from './Header/Header';
import { DataProvider } from './common/DataProvider/DataProvider';
import { ApiUrls, getTvShowApiUrlByImdbId } from './common/DataProvider/urls';
import { RouterUrls } from './common/urls';
import TvShow from './TvShow/TvShow';
import List from './subscriptions/List/List';
import Page404 from './Page404/Page404';
import Login from './accounts/Login/Login';
import { AuthProvider } from '../context/auth/AuthContext';
import { defaultTheme } from '../context/theme';


const App = () => {
    return (
        <AuthProvider>
            <MuiThemeProvider theme={defaultTheme}>
                <Router>
                    <Header />
                    <div className={layout.container}>
                        <Switch>
                            <Route exact path={RouterUrls.SUBSCRIPTIONS}>
                                <DataProvider
                                    key={RouterUrls.SUBSCRIPTIONS}
                                    url={ApiUrls.SUBSCRIPTIONS}
                                    isPrivate
                                    render={(data) => (<List data={data} />)}
                                />
                            </Route>
                            <Route exact path={RouterUrls.HOME}>
                            </Route>
                            <Route
                                path={RouterUrls.TV_SHOW}
                                render={({match}) => {
                                    const url = getTvShowApiUrlByImdbId(match.params.contentId);
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
