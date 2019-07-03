import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
  ABOUT_USER_REQUEST, ABOUT_USER_SUCCESS, ABOUT_USER_FAILURE,
  ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAILURE} from '../actions/actionsTypes'


export const user = (state = {set:false}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, isLoading: true}
    case LOGIN_SUCCESS:
      return {set:true, isLoading: false}
    case LOGIN_FAILURE:
      return {...state, error: action.error,isLoading: false}
    case LOGOUT:
      return {set:false}
    case ABOUT_USER_REQUEST:
        return {...state, isLoading: true}
    case ABOUT_USER_SUCCESS:
        return {...state, name: action.payload.name, role: action.payload.role, isLoading: false}
    case ABOUT_USER_FAILURE:
        return {...state, error: action.error,isLoading: false}  
    case ALL_USERS_REQUEST:
        return {...state, isLoading: true}
    case ALL_USERS_SUCCESS:
        return {...state, users: action.payload.users, isLoading:false}
    case ALL_USERS_FAILURE:
        return {...state, error: action.error,isLoading: false}  
    default:
      return state;
  }
};