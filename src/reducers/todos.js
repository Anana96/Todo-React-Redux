export const todos = (state = {list:[]}, action) => {
  switch (action.type) {
    case 'GET_ALL_TODOS':
      return {list: action.todos}
    case 'GET_ALL_TODOS_FAILURE':
      return {list:[], error:action.error}
    default:
      return state;
  }
};
