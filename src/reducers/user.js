export const user = (state = {set:false}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {set:true, login: action.login }
    case 'LOGIN_FAILURE':
      return {...state, error: action.error}
    case 'LOGOUT':
      return {set:false}
    default:
      return state;
  }
};