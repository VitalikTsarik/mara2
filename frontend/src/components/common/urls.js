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

export { RouterUrls, getTitleUrl, getHomeUrl };
