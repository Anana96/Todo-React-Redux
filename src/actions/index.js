import userService from '../service.js'

const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'

const LOGOUT = 'LOGOUT'
const ABOUT_USER = 'ABOUT_USER'
const ALL_USERS = 'ALL_USERS'

const GET_ALL_TODOS_REQUEST = 'GET_ALL_TODOS_REQUEST'
const GET_ALL_TODOS_SUCCESS = 'GET_ALL_TODOS_SUCCESS'
const GET_ALL_TODOS_FAILURE = 'GET_ALL_TODOS_FAILURE'

const GET_TODO_BY_ID_REQUEST = 'GET_TODO_BY_ID_REQUEST'
const GET_TODO_BY_ID_SUCCESS = 'GET_TODO_BY_ID_SUCCESS'
const GET_TODO_BY_ID_FAILURE = 'GET_TODO_BY_ID_FAILURE'

const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST'
const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE'

const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST'
const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE'

const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST'
const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'
const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE'

const actionCreateRequest = type => ({type})
const actionCreateSuccess = (type, payload) => ({type,payload})
const actionCreateFailure = (type, error) => ({type,error})

const loginRequest = () => ({
    type:'LOGIN_REQUEST'
})

const loginSuccess = user => ({
    type: 'LOGIN_SUCCESS',
    user
});

const loginFailure = error => ({
    type: 'LOGIN_FAILURE',
    error
})


const logout = () => ({
    type: 'LOGOUT'
});


const fetchLogin = (data) => async dispatch => {
  let url = `http://localhost:3000/api/v1/login`;
  dispatch(actionCreateRequest(LOGIN_REQUEST));
  userService.post(url, data).then(user => dispatch(actionCreateSuccess(LOGIN_SUCCESS,{user})))
  .catch(error => {
      console.log(error);
      dispatch(actionCreateFailure(LOGIN_FAILURE,'Такого пользователя нет'))
  });
}

const getAllTodosRequest = () => ({
    type: 'GET_ALL_TODOS_REQUEST',
});

const getAllTodosSuccess = todos => ({
    type: 'GET_ALL_TODOS_SUCCESS',
    todos
});

const getAllTodosFailure = error => ({
    type: 'GET_ALL_TODOS_FAILURE',
    error
});

const fetchGetTodos = () => async dispatch => {
     let url = `http://localhost:3000/api/v1/todos`;
     dispatch(getAllTodosRequest());
     await userService.get(url).then(todos => dispatch(getAllTodosSuccess(todos)))
     .catch(error => {
         console.log(error);
         dispatch(getAllTodosFailure('Todos не могут быть получены'));
     })
 } 
 
const getTodoByIdRequest = () => ({
    type: 'GET_TODO_BY_ID_REQUEST',
});

const getTodoByIdSuccess = todo => ({
    type: 'GET_TODO_BY_ID_SUCCESS',
    todo
});

const getTodoByIdFailure = error => ({
    type: 'GET_TODO_BY_ID_FAILURE',
    error
})

const fetchGetTodoById = (id) => async dispatch => {
    let url = `http://localhost:3000/api/v1/todos/${id}`;
    dispatch(getTodoByIdRequest());
    await userService.get(url).then(todo => dispatch(getTodoByIdSuccess(todo)))
    .catch(error => {
        console.log(error);
        dispatch(getTodoByIdFailure('Todo не найдено'));
    })
  }


const addTodoRequest = () => ({
    type: 'ADD_TODO_REQUEST',
});

const addTodoSuccess = todo => ({
    type: 'ADD_TODO_SUCCESS',
    todo
});

const addTodoFailure = error => ({
    type: 'ADD_TODO_FAILURE',
    error
})


const addTodo = (todo) => async dispatch => {
  let url = `http://localhost:3000/api/v1/todos`;
  dispatch(addTodoRequest());
  userService.post(url, todo).then(todo => dispatch(addTodoSuccess(todo)))
  .catch(error => {
      console.log(error);
      dispatch(addTodoFailure('Todo не может быть создано'))
  });
}

const deleteTodoRequest = () => ({
    type: 'DELETE_TODO_REQUEST',
});

const deleteTodoSuccess = id => ({
    type: 'DELETE_TODO_SUCCESS',
    id
});

const deleteTodoFailure = error => ({
    type: 'DELETE_TODO_FAILURE',
    error
})

const deleteTodo = (id) => async dispatch => {
    let url = `http://localhost:3000/api/v1/todos/${id}`;
    dispatch(deleteTodoRequest());
    await userService.del(url).then(() => dispatch(deleteTodoSuccess(id)))
    .catch(error => {
        console.error(`ошибка ${error}`);
        dispatch(deleteTodoFailure(error.toString()));
    })
  }


export {logout, fetchLogin, fetchGetTodos, fetchGetTodoById, addTodo, deleteTodo, DELETE_TODO_REQUEST }