import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import layout from '../styles/layout.scss';

import Header from './Header/Header';
import { DataProvider } from './common/DataProvider/DataProvider';
import { ApiUrls, getTvShowApiUrlByImdbId } from './common/DataProvider/urls';
import { RouterUrls } from './common/urls';
import TvShow from './TvShow/TvShow';
import List from './subscriptions/List/List';
import Page404 from './Page404/Page404';

const App = () => {
    return (
        <Router>
            <>
                <Header />
                <div className={layout.container}>
                    <Switch>
                        <Route exact path={RouterUrls.SUBSCRIPTIONS}>
                            <DataProvider
                                url={ApiUrls.SUBSCRIPTIONS}
                                key={RouterUrls.SUBSCRIPTIONS}
                                render={(data) => (<List data={data} />)}
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
                        <Route path="*">
                            <Page404 />
                        </Route>
                    </Switch>
                </div>
            </>
        </Router>
    );
};

export default App;
