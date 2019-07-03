import userService from '../service.js'
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
    ABOUT_USER_REQUEST, ABOUT_USER_SUCCESS, ABOUT_USER_FAILURE,
    ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAILURE,
    GET_ALL_TODOS_REQUEST, GET_ALL_TODOS_SUCCESS, GET_ALL_TODOS_FAILURE,
    GET_TODO_BY_ID_REQUEST, GET_TODO_BY_ID_SUCCESS, GET_TODO_BY_ID_FAILURE,
    ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE ,
    DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE,
    UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE} from './actionsTypes'


const actionCreateRequest = type => ({type})
const actionCreateSuccess = (type, payload) => ({type,payload})
const actionCreateFailure = (type, error) => ({type,error})


const login = (data) => async dispatch => {
    let url = `http://localhost:3000/api/v1/login`;
    dispatch(actionCreateRequest(LOGIN_REQUEST));
    userService.post(url, data).then(() =>{
         dispatch(actionCreateSuccess(LOGIN_SUCCESS))})
    .catch(error => {
        console.log(error);
        dispatch(actionCreateFailure(LOGIN_FAILURE,'Такого пользователя нет'))
    });
}

const logout = () => ({type: LOGOUT})

const aboutUser = () => async dispatch => {
     let url = `http://localhost:3000/api/v1/me`;
     dispatch(actionCreateRequest(ABOUT_USER_REQUEST));
     await userService.get(url).then(({role,name}) => dispatch(actionCreateSuccess(ABOUT_USER_SUCCESS, {role,name})))
     .catch(error => {
         console.log(error);
         dispatch(actionCreateFailure(ABOUT_USER_FAILURE,error.toString()));
     })
}

const allUsers = () => async dispatch => {
    let url = `http://localhost:3000/api/v1/users`;
    dispatch(actionCreateRequest(ALL_USERS_REQUEST));
    await userService.get(url).then(users => dispatch(actionCreateSuccess(ALL_USERS_SUCCESS, {users})))
    .catch(error => {
        console.log(error);
        dispatch(actionCreateFailure(ALL_USERS_FAILURE,error.toString()));
    })
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
    id = Number(id);
    dispatch(actionCreateRequest(UPDATE_TODO_REQUEST));
    await userService.put(url, todo).then(() => dispatch(actionCreateSuccess(UPDATE_TODO_SUCCESS, {id,todo})))
    .catch(error => {
        console.log(error);
        dispatch(actionCreateFailure(UPDATE_TODO_FAILURE,'Todo не может быть изменено'))
    });
}


export {logout, login,aboutUser, fetchGetTodos, fetchGetTodoById, addTodo, deleteTodo, updateTodo, allUsers }