import {
  GET_ALL_TODOS_REQUEST, GET_ALL_TODOS_SUCCESS, GET_ALL_TODOS_FAILURE,
  GET_TODO_BY_ID_REQUEST, GET_TODO_BY_ID_SUCCESS, GET_TODO_BY_ID_FAILURE,
  ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE ,
  DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE,
  UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE} from '../actions/actionsTypes'


export const todos = (state = {list:[], todo:null}, action) => {
  switch (action.type) {
    case GET_ALL_TODOS_REQUEST:
      return {...state, error: '', isLoading:true, success:false}
    case GET_ALL_TODOS_SUCCESS:
      return {...state, list: action.payload.todos, isLoading: false}
    case GET_ALL_TODOS_FAILURE:
      return {...state, list:[], error: action.error, isLoading: false}
    case GET_TODO_BY_ID_REQUEST:
        return {...state, todo: null, error:'', isLoading:true}
    case GET_TODO_BY_ID_SUCCESS:
        return {...state, todo: action.payload.todo, isLoading: false}
    case GET_TODO_BY_ID_FAILURE:
        return {...state,error: action.error, isLoading: false}
    case ADD_TODO_REQUEST:
        return {...state, error:'', isLoading: true}
    case ADD_TODO_SUCCESS:
        return {...state, list:[...state.list, action.payload.todo], isLoading: false, success:true}
    case ADD_TODO_FAILURE:
        return {...state, error: action.error, isLoading: false}
    case DELETE_TODO_REQUEST:
      return {...state,error:'', isLoading:true}
    case DELETE_TODO_SUCCESS:{
      state.list = state.list.filter(todo => todo.id != action.payload.id);
      return {...state, isLoading: false}
    }
    case DELETE_TODO_FAILURE:
        return {...state, error: action.error, isLoading: false}
    case UPDATE_TODO_REQUEST:
      return {...state,error:'', isLoading:true}
    case UPDATE_TODO_SUCCESS:{
        state.list = state.list.map( todo => {
          if(todo.id === action.payload.id){
            todo.title = action.payload.todo.title;
            todo.description = action.payload.todo.description;
          }
          return todo;
        });
        return {...state, isLoading: false, success:true}
    }
    case UPDATE_TODO_FAILURE:
        return {...state, error: action.error, isLoading: false}
    default:
      return state;
  }
};