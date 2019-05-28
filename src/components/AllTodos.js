import React from "react"
import { connect } from "react-redux"
import {Link} from 'react-router-dom';
import Menu from "./Menu"
import {fetchGetTodos} from "../actions"


  const mapDispatchToProps = {
      getTodos: fetchGetTodos
  };
  
  const  mapStateToProps = state => {
    return {
      todos: state.todos.list,
      error: state.todos.error
    };
  };

  class Todo extends React.Component{
  
    componentDidMount() {
      this.props.getTodos();
    }
    
    render() {
      let todos = this.props.todos;
      let error = this.props.error;
      return (
        <div className="container">
          <Menu/>
          <h1>Todo:</h1>
          <div className="container-events">
              { error?
                <h2> {error} </h2>
                :
                todos.map(todo => {
                  return(   
                    <div className ="event" key={todo.id}>
                      <h3>
                      <Link to = {`/todo/${todo.id}`} >{todo.title}</Link>
                      </h3>
                      <p>Описание: {todo.description}</p>
                      <p>Создан: {todo.createdBy}</p>
                    </div>
                    );
                  })
              }
          </div>
        </div>
      )
    }
  }

export const WrapperTodo = connect(mapStateToProps,mapDispatchToProps)(Todo);