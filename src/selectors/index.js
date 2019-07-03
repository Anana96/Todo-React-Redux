const getExistUser = state => state.user.set;
const getUserName = state => state.user.name;
const getUserRole = state => state.user.role;
const getErrorUser = state => state.user.error;
const getLoadingUser = state => state.user.isLoading;
const getUsers = state => state.user.users;
 
const getTodos = state => state.todos.list;
const getErrorTodos = state => state.todos.error;
const getIsLoadingTodos = state => state.todos.isLoading;
const getTodo = state => state.todos.todo;
const getResultOperation = state => state.todos.success;

export {getExistUser,getUserName,getUserRole, getErrorUser,getLoadingUser, getUsers, getTodos, getErrorTodos, getIsLoadingTodos,
        getTodo, getResultOperation}