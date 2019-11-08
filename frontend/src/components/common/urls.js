const RouterUrls = Object.freeze({
    HOME: ['/home', '/'],
    SUBSCRIPTIONS: '/list',
    TV_SHOW: '/tv-show/:contentId',
});

const getTvShowUrl = (contenId) => {
    return RouterUrls.TV_SHOW.replace(':contentId', contenId);
};

const getHomeUrl = () => {
    return RouterUrls.HOME[0];
};

export { RouterUrls, getTvShowUrl, getHomeUrl };
