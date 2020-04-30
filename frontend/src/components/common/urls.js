const RouterUrls = Object.freeze({
    HOME: ['/home', '/'],
    SUBSCRIPTIONS: '/list',
    TITLE: '/title/:id',
    LOGIN: '/login',
    REGISTER: '/register',
    SEARCH: '/search',
});

const getTitleUrl = (id) => {
    return RouterUrls.TITLE.replace(':id', id);
};

const getHomeUrl = () => {
    return RouterUrls.HOME[0];
};

const getSearchUrl = (q) => {
    return RouterUrls.SEARCH + `?q=${q}`;
};

export { RouterUrls, getTitleUrl, getHomeUrl, getSearchUrl };
