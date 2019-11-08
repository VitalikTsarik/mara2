const ApiUrls = Object.freeze({
    SUBSCRIPTIONS: '/api/subscriptions/',
    TV_SHOW: '/api/tv_show/',
});

const getTvShowUrl = (imdbId) => {
    return ApiUrls.TV_SHOW.concat(imdbId);
};

export { ApiUrls, getTvShowUrl };
