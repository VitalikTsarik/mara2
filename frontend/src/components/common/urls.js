const RouterUrls = Object.freeze({
    HOME: ['/home', '/'],
    SUBSCRIPTIONS: '/list',
    TITLE: '/title/:contentId',
    LOGIN: '/login',
    REGISTER: '/register',
    SEARCH: '/search',
});

const getTitleUrl = (contenId) => {
    return RouterUrls.TITLE.replace(':contentId', contenId);
};

const getHomeUrl = () => {
    return RouterUrls.HOME[0];
};

export { RouterUrls, getTitleUrl, getHomeUrl };
