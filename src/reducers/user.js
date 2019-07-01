export const user = (state = {set:false}, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {...state, sumbititing: true}
    case 'LOGIN_SUCCESS':
      return {set:true, info: action.payload.user, sumbititing: false}
    case 'LOGIN_FAILURE':
      return {...state, error: action.error,sumbititing: false}
    case 'LOGOUT':
      return {set:false}
    default:
      return state;
  }
};