const request  = async (method, url, content = null) => {
    let data = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };
    if(content)
        data.body = JSON.stringify(content);
    try {
        const response = await fetch(url,data);
        console.log(response);
        if (!response.ok)
            throw new Error(response.statusText);
        let responseBody = await response.text();
        if(responseBody)
            return JSON.parse(responseBody);
        return;
    }
    catch (error) {
        throw error;
    }
}

const get = (url) => {
    return request('GET', url);
}

const post = (url, content) => {
    return request('POST', url, content);
}

const put = (url, content) => {
    return request('PUT', url, content);
}

const del = (url) => {
    return request('DELETE', url);
}

const userService = {get, post, put, del};
export default userService;

