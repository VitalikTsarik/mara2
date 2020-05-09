import Cookies from 'js-cookie';

import { getSubscribeUrl, getUnsubscribeUrl } from '../components/common/DataProvider/urls';
import { withAuthorization } from './auth';

const subscribe = async (id) => {
    const url = getSubscribeUrl(id);
    const csrfToken = Cookies.get('csrftoken');

    return await fetch(url, withAuthorization({
        method: 'post',
        credentials: 'include',
        headers: {
            'X-CSRFToken': csrfToken,
        },
    })).then(res => {
        if (res.ok) {
            return true;
        } else {
            throw Error('Error Subscribe');
        }
    }).then(data => {
        return data;
    });
};

const unsubscribe = async (id) => {
    const url = getUnsubscribeUrl(id);
    const csrfToken = Cookies.get('csrftoken');

    return await fetch(url, withAuthorization({
        method: 'post',
        credentials: 'include',
        headers: {
            'X-CSRFToken': csrfToken,
        },
    })).then(res => {
        if (res.ok) {
            return true;
        } else {
            throw Error('Error Unsubscribe');
        }
    }).then(data => {
        return data;
    });
};

export { subscribe, unsubscribe };
