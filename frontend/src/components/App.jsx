import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import layout from '../styles/layout.scss';

import Header from './Header/Header';
import { DataProvider } from './common/DataProvider/DataProvider';
import { ApiUrls, getTvShowApiUrl, getTvShowApiUrlByImdbId } from './common/DataProvider/urls';
import { RouterUrls } from './common/urls';
import TvShow from './TvShow/TvShow';
import List from './subscriptions/List/List';

const App = () => {
    return (
        <Router>
            <>
                <Header />
                <div className={layout.container}>
                    <Switch>
                        <Route path={RouterUrls.SUBSCRIPTIONS}>
                            <DataProvider
                                url={ApiUrls.SUBSCRIPTIONS}
                                key={RouterUrls.SUBSCRIPTIONS}
                                render={() => (
                                    <DataProvider
                                        url={ApiUrls.SUBSCRIPTIONS}
                                        render={data => <List data={data} />}
                                    />
                                )}
                            />
                        </Route>
                        <Route exact path={RouterUrls.HOME}>
                        </Route>
                        <Route
                            path={RouterUrls.TV_SHOW}
                            render={({match}) => {
                                const contentId = getTvShowApiUrlByImdbId(match.params.contentId);
                                return (
                                    <DataProvider
                                        key={contentId}
                                        url={contentId}
                                        render={data => <TvShow data={data} />}
                                    />
                                );
                            }}
                        />
                    </Switch>
                </div>
            </>
        </Router>
    );
};

export default App;
