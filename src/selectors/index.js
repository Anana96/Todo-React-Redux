const getExistUser = state => state.user.set;
const getUser = state => state.user.info;
const getErrorUser = state => state.user.error;
const getSubmiting = state => state.user.sumbititing;
 
const getTodos = state => state.todos.list
const getErrorTodos = state => state.todos.error
const getIsLoadingTodos = state => state.todos.isLoading


const getTodo = state => state.todos.todo
const getErrorTodo = state => state.todos.error
const getIsLoadingTodo = state => state.todos.isLoading

const getSubmitingTodo = state => state.todos.sumbititing;

export {getExistUser,getUser, getErrorUser,getSubmiting, getTodos, getErrorTodos, getIsLoadingTodos,
        getTodo, getErrorTodo, getIsLoadingTodo, getSubmitingTodo}