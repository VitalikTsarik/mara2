import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import layout from '../styles/layout.scss';

import Header from './Header/Header';
import { DataProvider } from './common/DataProvider/DataProvider';
import Item from './subscriptions/Item/Item';
import { ApiUrls, getTvShowApiUrl, getTvShowApiUrlByImdbId } from './common/DataProvider/urls';
import { RouterUrls } from './common/urls';
import TvShow from './TvShow/TvShow';

const Subscriptions = ({data}) => {
    return data.map(sub => (
        <div>{sub.title}</div>
    ));
};

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
                                render={data => <Subscriptions data={data} />}
                            />
                        </Route>
                        <Route exact path={RouterUrls.HOME}>
                            <Item item={{
                                title: 'Better Call Soul',
                                posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTAxOTQ0MjUzMzJeQTJeQWpwZ15BbWU4MDY0NTAxNzMx._V1_SY1000_CR0,0,674,1000_AL_.jpg'
                            }} />
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
