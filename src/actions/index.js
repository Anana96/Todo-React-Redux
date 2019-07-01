import userService from '../service.js'

const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'

const LOGOUT = 'LOGOUT'
const ABOUT_USER = 'ABOUT_USER'
const ALL_USERS = 'ALL_USERS'

const GET_ALL_TODOS_REQUEST = 'GET_ALL_TODOS_REQUEST'
const GET_ALL_TODOS_SUCCESS = 'GET_ALL_TODOS_SUCCESS'
const GET_ALL_TODOS_FAILURE = 'GET_ALL_TODOS_FAILURE'

const GET_TODO_BY_ID_REQUEST = 'GET_TODO_BY_ID_REQUEST'
const GET_TODO_BY_ID_SUCCESS = 'GET_TODO_BY_ID_SUCCESS'
const GET_TODO_BY_ID_FAILURE = 'GET_TODO_BY_ID_FAILURE'

const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST'
const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE'

const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST'
const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE'

const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST'
const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'
const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE'

const actionCreateRequest = type => ({type})
const actionCreateSuccess = (type, payload) => ({type,payload})
const actionCreateFailure = (type, error) => ({type,error})


const logout = () => ({
    type: 'LOGOUT'
});


const fetchLogin = (data) => async dispatch => {
    let url = `http://localhost:3000/api/v1/login`;
    dispatch(actionCreateRequest(LOGIN_REQUEST));
    userService.post(url, data).then(user => dispatch(actionCreateSuccess(LOGIN_SUCCESS,{user})))
    .catch(error => {
        console.log(error);
        dispatch(actionCreateFailure(LOGIN_FAILURE,'Такого пользователя нет'))
    });
}

const fetchGetTodos = () => async dispatch => {
     let url = `http://localhost:3000/api/v1/todos`;
     dispatch(actionCreateRequest(GET_ALL_TODOS_REQUEST));
     await userService.get(url).then(todos => dispatch(actionCreateSuccess(GET_ALL_TODOS_SUCCESS, {todos})))
     .catch(error => {
         console.log(error);
         dispatch(actionCreateFailure(GET_ALL_TODOS_FAILURE,'Todos не могут быть получены'));
     })
 } 

const fetchGetTodoById = (id) => async dispatch => {
    let url = `http://localhost:3000/api/v1/todos/${id}`;
    dispatch(actionCreateRequest(GET_TODO_BY_ID_REQUEST));
    await userService.get(url).then(todo => dispatch(actionCreateSuccess(GET_TODO_BY_ID_SUCCESS,{todo})))
    .catch(error => {
        console.log(error);
        dispatch(actionCreateFailure(GET_TODO_BY_ID_FAILURE,'Todo не найдено'));
    })
}

const addTodo = (todo) => async dispatch => {
    let url = `http://localhost:3000/api/v1/todos`;
    dispatch(actionCreateRequest(ADD_TODO_REQUEST));
    userService.post(url, todo).then(todo => dispatch(actionCreateSuccess(ADD_TODO_SUCCESS,{todo})))
    .catch(error => {
        console.log(error);
        dispatch(actionCreateFailure(ADD_TODO_FAILURE,'Todo не может быть создано'))
    });
}

const deleteTodo = (id) => async dispatch => {
    let url = `http://localhost:3000/api/v1/todos/${id}`;
    dispatch(actionCreateRequest(DELETE_TODO_REQUEST));
    await userService.del(url).then(() => dispatch(actionCreateSuccess(DELETE_TODO_SUCCESS,{id})))
    .catch(error => {
        console.error(`ошибка ${error}`);
        dispatch(actionCreateFailure(DELETE_TODO_FAILURE,error.toString()));
    })
}

const updateTodo = (id, todo) => async dispatch => {
    let url = `http://localhost:3000/api/v1/todos/${id}`;
    dispatch(actionCreateRequest(UPDATE_TODO_REQUEST));
    await userService.put(url, todo).then(todo => dispatch(actionCreateSuccess(UPDATE_TODO_SUCCESS,{todo})))
    .catch(error => {
        console.log(error);
        dispatch(actionCreateFailure(UPDATE_TODO_FAILURE,'Todo не может быть изменено'))
    });
}


export {logout, fetchLogin, fetchGetTodos, fetchGetTodoById, addTodo, deleteTodo, updateTodo }