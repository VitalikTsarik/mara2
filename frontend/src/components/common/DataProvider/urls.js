const ApiUrls = Object.freeze({
    SUBSCRIPTIONS: '/api/subscriptions/',
    TV_SHOW: '/api/tv_show/:id/',
    TV_SHOW_IMDB: '/api/tv_show/imdb/:id/',
    SUBSCRIBE: '/api/subscribe/',
    LOGIN: '/api/login/',
    LOGOUT: '/api/logout/',
    REGISTER: '/api/register/',
    USER: '/api/user/',
});

const getTvShowApiUrl = (contenId) => {
    return ApiUrls.TV_SHOW.replace(':id', contenId);
};

const getTvShowApiUrlByImdbId = (imdbId) => {
    return ApiUrls.TV_SHOW_IMDB.replace(':id', imdbId);
};

const getSubscribeUrl = (id) => {
    return ApiUrls.SUBSCRIBE + id;
};

export { ApiUrls, getTvShowApiUrl, getTvShowApiUrlByImdbId, getSubscribeUrl };
