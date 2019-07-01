
export const todos = (state = {list:[], todo:null}, action) => {
  switch (action.type) {
    case 'GET_ALL_TODOS_REQUEST':
      return {...state, isLoading:true}
    case 'GET_ALL_TODOS_SUCCESS':
      return {...state, list: action.payload.todos, isLoading: false}
    case 'GET_ALL_TODOS_FAILURE':
      return {...state, list:[], error: action.error, isLoading: false}
    case 'GET_TODO_BY_ID_REQUEST':
        return {...state, isLoading:true}
    case 'GET_TODO_BY_ID_SUCCESS':
        return {...state, todo: action.payload.todo, isLoading: false}
    case 'GET_TODO_BY_ID_FAILURE':
        return {...state,error: action.error, isLoading: false}
    case 'ADD_TODO_REQUEST':
        return {...state, sumbititing: true}
    case 'ADD_TODO_SUCCESS':
        return {...state, list:[...state.list, action.payload.todo], sumbititing: false}
    case 'ADD_TODO_FAILURE':
        return {...state, error: action.error, sumbititing: false}
    case 'DELETE_TODO_REQUEST':
      return {...state, isLoading:true}
    case 'DELETE_TODO_SUCCESS':{
      let newList = [...state.list];
      newList = newList.filter(todo => todo.id != action.payload.id);
      return {...state, list:newList, isLoading: false}
    }
    case 'DELETE_TODO_FAILURE':
        return {...state, error: action.error, isLoading: false}
    case 'UPDATE_TODO_REQUEST':
      return {...state, isLoading:true}
    case 'UPDATE_TODO_SUCCESS':{
        let newList = [...state.list];
        newList[action.id].title = action.payload.todo.title;
        newList[action.id].description = action.payload.todo.description;
        return {...state, list:newList, isLoading: false}
    }
    case 'UPDATE_TODO_FAILURE':
        return {...state, error: action.error, isLoading: false}
    default:
      return state;
  }
};