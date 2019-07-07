import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  ABOUT_USER_REQUEST, ABOUT_USER_SUCCESS, ABOUT_USER_FAILURE,
  ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS,LOGOUT_FAILURE} from '../actions/actionsTypes'


export const user = (state = {set:null, error:''}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { isLoading: true}
    case LOGIN_SUCCESS:
      return {set:true, isLoading: false}
    case LOGIN_FAILURE:
      return {...state, set:false, error: action.error,isLoading: false}
    case LOGOUT_REQUEST:
      return {...state,error:'', isLoading:true}
    case LOGOUT_SUCCESS:
      return {...state, set:false, role:'',name:'', isLoading:false}
    case LOGOUT_FAILURE:
      return {...state, error: action.error, isLoading:false}
    case ABOUT_USER_REQUEST:
        return {...state, isLoading: true}
    case ABOUT_USER_SUCCESS:
        return {...state,set:true, name: action.payload.name, role: action.payload.role, isLoading: false}
    case ABOUT_USER_FAILURE:
        return {...state,set:false, isLoading: false, error:action.error}  
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