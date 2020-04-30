const ApiUrls = Object.freeze({
    SUBSCRIPTIONS: '/api/subscriptions/',
    TITLE: '/api/title/:id/',
    SUBSCRIBE: '/api/subscribe/',
    LOGIN: '/api/login/',
    LOGOUT: '/api/logout/',
    REGISTER: '/api/register/',
    USER: '/api/user/',
    SEARCH: '/api/search',
});

const getTitleApiUrl = (contenId) => {
    return ApiUrls.TITLE.replace(':id', contenId);
};

const getSubscribeUrl = (id) => {
    return ApiUrls.SUBSCRIBE + id;
};

const getSearchUrl = (q, chunk) => {
    const params = [];
    params.push(`?q=${q}`);
    if (chunk) {
        params.push(`chunk=${chunk}`)
    }
    return ApiUrls.SEARCH + params.join('&');
};

export { ApiUrls, getTitleApiUrl, getSubscribeUrl, getSearchUrl };
