const ApiUrls = Object.freeze({
    SUBSCRIPTIONS: '/api/subscriptions/',
    TV_SHOW: '/api/tv_show/',
    TV_SHOW_IMDB: '/api/tv_show/imdb/',
});

const getTvShowApiUrl = (contenId) => {
    return ApiUrls.TV_SHOW.concat(contenId);
};

const getTvShowApiUrlByImdbId = (imdbId) => {
    return ApiUrls.TV_SHOW_IMDB.concat(imdbId);
};

export { ApiUrls, getTvShowApiUrl, getTvShowApiUrlByImdbId };
