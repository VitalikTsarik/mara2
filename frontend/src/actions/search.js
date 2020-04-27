import { getSearchUrl } from '../components/common/DataProvider/urls';

const getNextChunk = async (q, chunk) => {
    const url = getSearchUrl(q, chunk);

    return await fetch(url, {
        method: 'get',
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw Error('Error fetch next chunk');
        }
    }).then(data => {
        return data;
    });
};

export { getNextChunk };
