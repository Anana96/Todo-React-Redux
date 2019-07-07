export const getExistUser = state => state.user.set;
export const getUserName = state => state.user.name;
export const getUserRole = state => state.user.role;
export const getErrorUser = state => state.user.error;
export const getLoadingUser = state => state.user.isLoading;
export const getUsers = state => state.user.users;
 
export const getTodos = state => state.todos.list;
export const getErrorTodos = state => state.todos.error;
export const getIsLoadingTodos = state => state.todos.isLoading;
export const getTodo = state => state.todos.todo;
export const getResultOperation = state => state.todos.success;

