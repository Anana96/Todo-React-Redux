import { combineReducers } from 'redux';
import {todos} from "./todos.js"
import {user} from "./user.js"

const reducers = combineReducers({ todos, user });
export default reducers;