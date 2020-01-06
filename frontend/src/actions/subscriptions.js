import { ApiUrls } from '../components/common/DataProvider/urls';

import Cookies from 'js-cookie';

const subscribe = async (id) => {
    const url = ApiUrls.SUBSCRIBE + id;
    const csrfToken = Cookies.get('csrftoken');

    return await fetch(url, {
        method: 'post',
        credentials: 'include',
        headers: {
            'X-CSRFToken': csrfToken,
        },
    }).then(res => {
        if (res.ok) {
            return true;
        } else {
            throw Error('Error Subscribe');
        }
    }).then(data => {
        return data;
    });
};

export { subscribe };
