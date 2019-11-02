import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header/Header';

const App = () => {
    return (
        <>
            <Header />
        </>
    );
};

const wrapper = document.getElementById('app');
wrapper ? ReactDOM.render(<App />, wrapper) : null;

export default App;
