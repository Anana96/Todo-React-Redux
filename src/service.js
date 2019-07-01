const get = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (!response.ok)
            throw new Error(response.statusText);
        return await response.json();
    }
    catch (error) {
        throw error;
    }
}

const post = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        console.log(response);
        if (!response.ok)
            throw new Error(response.statusText);
        return await response.json();
    }
    catch (error) {
        throw error;
    }
}

const del = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        console.log(response);
        if (!response.ok)
            throw new Error(response.statusText);
        if(response.status === 204)
            return;
        return await response.json();
    }
    catch (error) {
        throw error;
    }
}


const put = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        console.log(response);
        if (!response.ok)
            throw new Error(response.statusText);
        if(response.status === 204)
            return;
        return await response.json();
    }
    catch (error) {
        throw error;
    }
}

const userService = {get, post, del, put};
export default userService;