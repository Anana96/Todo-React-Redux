import userService from '../service.js'
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    ABOUT_USER_REQUEST, ABOUT_USER_SUCCESS, ABOUT_USER_FAILURE,
    ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAILURE} from './actionsTypes'
import {actionCreateRequest, actionCreateSuccess, actionCreateFailure} from './index'

const login = (data, meta) => async dispatch => {
    let url = `http://localhost:3000/api/v1/login`;
    dispatch(actionCreateRequest( LOGIN_REQUEST));
    userService.post(url,data).then(() =>{
         dispatch(actionCreateSuccess(LOGIN_SUCCESS))
         meta.setSubmitting(false);
    })
    .catch(error => {
        console.log(error);
        dispatch(actionCreateFailure(LOGIN_FAILURE,'Такого пользователя нет'))
        meta.setSubmitting(false);
    });
}

const logout = () => async dispatch => {
    let url = `http://localhost:3000/api/v1/logout`;
    dispatch(actionCreateRequest(LOGOUT_REQUEST));
    await userService.post(url).then(() => dispatch(actionCreateSuccess(LOGOUT_SUCCESS)))
    .catch(error => {
        console.log(error);
        dispatch(actionCreateFailure(LOGOUT_FAILURE,error.toString()));
    })
}

const aboutUser = (meta) => async dispatch => {
     let url = `http://localhost:3000/api/v1/me`;
     dispatch(actionCreateRequest(ABOUT_USER_REQUEST));
     await userService.get(url).then(({role,name}) =>{
        dispatch(actionCreateSuccess(ABOUT_USER_SUCCESS, {role,name}));
     })
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

export {login, logout, aboutUser, allUsers}