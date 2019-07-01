import Menu from './Menu'
import React from 'react'
import { connect } from 'react-redux'
import { fetchGetTodoById } from '../actions'
import {getTodo,getErrorTodo,getIsLoadingTodo} from '../selectors'


const  mapStateToProps = state => {
  return {
    todo: getTodo(state),
    error: getErrorTodo(state),
    isLoading: getIsLoadingTodo(state)
  };
};

const mapDispatchToProps = {
    getTodo: fetchGetTodoById
};


class Todo extends React.Component{

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getTodo(id);
      }

    render(){
        let {todo,error,isLoading} = this.props;
        if(error){
          return(
            <div className="container">
                <h2> {error} </h2>
            </div>
          )
        }
        return(
          <div className="container">
          <Menu/>
          <h1>Todo:</h1>
          <div className="container-events">
                { isLoading?  <p>Loading...</p> :
                  todo? 
                     ( 
                      <div className ="event" key={todo.id}>
                        <h3>{todo.title}</h3>
                        <p>Описание: {todo.description}</p>
                        <p>Создан: {todo.createdBy}</p>
                      </div>
                   ): <div></div>
                 }
          </div>
        </div>
        )
    }
}

export const WrapperTodo = connect(mapStateToProps,mapDispatchToProps)(Todo);