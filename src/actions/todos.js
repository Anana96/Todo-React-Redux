import userService from '../service.js'
import {GET_ALL_TODOS_REQUEST, GET_ALL_TODOS_SUCCESS, GET_ALL_TODOS_FAILURE,
        GET_TODO_BY_ID_REQUEST, GET_TODO_BY_ID_SUCCESS, GET_TODO_BY_ID_FAILURE,
        ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE ,
        DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE,
        UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE} from './actionsTypes'
import {actionCreateRequest, actionCreateSuccess, actionCreateFailure} from './index'


const fetchGetTodos = () => async dispatch => {
    let url = `http://localhost:3000/api/v1/todos`;
    dispatch(actionCreateRequest(GET_ALL_TODOS_REQUEST));
    await userService.get(url).then(todos => dispatch(actionCreateSuccess(GET_ALL_TODOS_SUCCESS, {todos})))
    .catch(error => {
        console.error(error);
        dispatch(actionCreateFailure(GET_ALL_TODOS_FAILURE,'Todos не могут быть получены'));
    })
} 

const fetchGetTodoById = (id) => async dispatch => {
   let url = `http://localhost:3000/api/v1/todos/${id}`;
   dispatch(actionCreateRequest(GET_TODO_BY_ID_REQUEST));
   await userService.get(url).then(todo => dispatch(actionCreateSuccess(GET_TODO_BY_ID_SUCCESS,{todo})))
   .catch(error => {
       console.error(error);
       dispatch(actionCreateFailure(GET_TODO_BY_ID_FAILURE,'Todo не найдено'));
   })
}

const addTodo = (todo, meta) => async dispatch => {
   let url = `http://localhost:3000/api/v1/todos`;
   dispatch(actionCreateRequest(ADD_TODO_REQUEST));
   userService.post(url,todo).then(todo => {
       dispatch(actionCreateSuccess(ADD_TODO_SUCCESS,{todo}))
       meta.setSubmitting(false);
   })
   .catch(error => {
       console.error(error);
       dispatch(actionCreateFailure(ADD_TODO_FAILURE,'Todo не может быть создано'));
       meta.setSubmitting(false);
   });
}

const deleteTodo = (id) => async dispatch => {
   let url = `http://localhost:3000/api/v1/todos/${id}`;
   dispatch(actionCreateRequest(DELETE_TODO_REQUEST));
   await userService.del(url).then(() => dispatch(actionCreateSuccess(DELETE_TODO_SUCCESS,{id})))
   .catch(error => {
       console.error(error);
       dispatch(actionCreateFailure(DELETE_TODO_FAILURE,error.toString()));
   })
}

const updateTodo = (id, todo, meta) => async dispatch => {
   let url = `http://localhost:3000/api/v1/todos/${id}`;
   id = Number(id);
   dispatch(actionCreateRequest(UPDATE_TODO_REQUEST));
   await userService.put(url,todo).then(() => {
       dispatch(actionCreateSuccess(UPDATE_TODO_SUCCESS, {id,todo}))
       meta.setSubmitting(false);
   })
   .catch(error => {
       console.error(error);
       dispatch(actionCreateFailure(UPDATE_TODO_FAILURE,'Todo не может быть изменено'));
       meta.setSubmitting(false);
   });
}

export { fetchGetTodos, fetchGetTodoById, addTodo, deleteTodo, updateTodo }