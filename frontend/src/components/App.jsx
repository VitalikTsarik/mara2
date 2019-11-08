import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import layout from '../styles/layout.scss';

import Header from './Header/Header';
import { DataProvider } from './common/DataProvider/DataProvider';
import Item from './subscriptions/Item/Item';
import SubButton from './common/SubButton/SubButton';
import { ApiUrls } from './common/DataProvider/urls';

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
                    <Route exact path='/1'>
                        <DataProvider
                            url={ApiUrls.SUBSCRIPTIONS}
                            render={data => <Subscriptions data={data} />}
                        />
                    </Route>
                    <Route exact path='/2'>
                        <Item item={{
                            title: 'Better Call Soul',
                            posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTAxOTQ0MjUzMzJeQTJeQWpwZ15BbWU4MDY0NTAxNzMx._V1_SY1000_CR0,0,674,1000_AL_.jpg'
                        }} />
                    </Route>
                    <Route exact path='/3'>
                        <SubButton onClick={() => {
                        }} />
                    </Route>
                </div>
            </>
        </Router>
    );
};

export default App;
