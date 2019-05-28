const login = response => ({
    type: 'LOGIN',
    login: response.name
});

const errorLogin = error => ({
    type: 'LOGIN_FAILURE',
    error
})


const logout = () => ({
    type: 'LOGOUT'
});


const fetchLogin = (data) => async dispatch => {
  let url = `http://localhost:3000/api/v1/login`;
  let response,responseBody;
  try {
        response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
        });
        if (!response.ok)
            throw new Error(response.statusText);
        responseBody = await response.json();
        console.log(responseBody);
        dispatch(login(responseBody));
  } catch (error) {
        console.error(error);
        dispatch(errorLogin('Такого пользователя нет'));
  }
}



const getTodos = todos => ({
    type: 'GET_ALL_TODOS',
    todos,
});


const errorGetTodos = error => ({
    type: 'GET_ALL_TODOS_FAILURE',
    error
})


const fetchGetTodos = () => async dispatch => {
    let url = `http://localhost:3000/api/v1/todos`;
    let response,responseBody;
    try {
        response = await fetch(url,{
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (!response.ok) 
            throw new Error(response.statusText);
        responseBody = await response.json();
        dispatch(getTodos(responseBody));
    } catch (error) {
        console.error(error);
        dispatch(errorGetTodos('Todos не могут быть получены'));
    }
  }

  export {logout, fetchLogin,fetchGetTodos}