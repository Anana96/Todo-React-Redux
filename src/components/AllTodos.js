import React from "react"
import { connect } from "react-redux"
import {Link} from 'react-router-dom';
import Menu from "./Menu"
import {fetchGetTodos, deleteTodo} from "../actions/todos"
import {getTodos,getErrorTodos,getIsLoadingTodos, getUserRole} from "../selectors"


  const mapDispatchToProps = {
      getTodos:fetchGetTodos,
      deleteTodo
  };
  
  const  mapStateToProps = state => {
    return {
      todos: getTodos(state),
      error: getErrorTodos(state),
      isLoading: getIsLoadingTodos(state),
      role: getUserRole(state)
    };
  };

  const RenderTodo = (props) => {
     let {todo, role, deleteTodo} = props;
     console.log(todo,role);
     return (
      <div className ="event" >
        <h3><Link to = {`/todos/${todo.id}`} >{todo.title}</Link></h3>
        <p>Описание: {todo.description}</p>
        <p>Создан: {todo.createdBy}</p>
        { role === todo.createdBy || role === 'admin' ?
          <div>
            <Link to={`/updateTodo/${todo.id}`}><button className="button-todo update-todo">Редактировать</button></Link>
            <button onClick = {() => {deleteTodo(todo.id)}} className="button-todo delete-todo">Удалить</button> 
          </div>:''
        }
      </div>
     );
}


  class Todos extends React.Component
  {
    componentDidMount() {
      this.props.getTodos();
    }
    
    render() {
      let {todos,error, isLoading,role} = this.props;
      return (
        <div className="container">
          <Menu/>
          <Link to = '/addTodo/'><button className='add-button'>Add new todo</button></Link>
          <h1>All todos:</h1>
          <div className="container-events">
                { isLoading? <p>Loading...</p>:
                  error?
                  <h2> {error} </h2>
                  :
                  todos &&
                  todos.map(todo => <RenderTodo todo = {todo} role={role} deleteTodo={this.props.deleteTodo} key={todo.id} />)
                }
          </div>
        </div>
      )
    }
  }

export const WrapperTodos = connect(mapStateToProps,mapDispatchToProps)(Todos);