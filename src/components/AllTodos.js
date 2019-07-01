import React from "react"
import { connect } from "react-redux"
import {Link} from 'react-router-dom';
import Menu from "./Menu"
import {fetchGetTodos,addTodo, deleteTodo} from "../actions"
import {getTodos,getErrorTodos,getIsLoadingTodos,getSubmitingTodo, getUser} from "../selectors"
import { Form, Field, Formik } from "formik"
import * as yup from "yup"

  const mapDispatchToProps = {
      getTodos:fetchGetTodos,
      addTodo,
      deleteTodo
  };
  
  const  mapStateToProps = state => {
    return {
      todos: getTodos(state),
      error: getErrorTodos(state),
      isLoading: getIsLoadingTodos(state),
      submitting: getSubmitingTodo(state),
      user: getUser(state)
    };
  };

  const addTodoValidation = yup.object().shape({
    title: yup.string()
      .required('Загаловок не введен'),
    description: yup.string()
      .required('Описание не введено')
  });




  class FormTodo extends React.Component{
    render(){
      return( 
          <div className="form-add-todo">
            <h1>Add todo:</h1>
            <Formik   
              initialValues={{ title: this.props.title, description: this.props.description }}
              onSubmit={(value,actions) => {
                  this.props.addTodo(value);
                  console.log(actions);
                  actions.setSubmitting(this.props.submitting);
                  actions.resetForm();
            }}
            validationSchema={addTodoValidation}
            render = {({
              touched,
              errors,
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              error = this.props.error
            })  => (
                <Form onSubmit={handleSubmit}>
                <Field  type="text" name="title"  value = {values.title} onChange={handleChange} onBlur={handleBlur} className={ errors.title && touched.title ? 'text-input error' : 'text-input'}/>
                <div className="input-feedback">{errors.title}</div>
                <Field  component="textarea" rows="5" col="5" name="description" value = {values.description} onChange={handleChange} onBlur={handleBlur} className={ errors.description && touched.description ? 'text-input error' : 'text-input'}/>
                <div className="input-feedback">{errors.description}</div>
                <div>
                {error && (
                <div className="input-feedback">{error}</div>)}
                  <button type="button" className="outline button-form" onClick={handleReset}> Reset</button>
                  <button type="submit" className="button-form" disabled={this.props.submitting}> Submit </button>
                </div>
                </Form>
            )}
             />
            </div>
        )
    }
}


  const WrapperFormTodo = connect(mapStateToProps,mapDispatchToProps)(FormTodo);


  class Todos extends React.Component
  {
    componentDidMount() {
      this.props.getTodos();
    }
    
    render() {
      let {todos,error, isLoading} = this.props;
      return (
        <div className="container">
          <Menu/>
          <h1>All todos:</h1>
          <div className="container-events">
                { isLoading? <p>Loading...</p>:
                  error?
                  <h2> {error} </h2>
                  :
                  todos? 
                  todos.map(todo => {
                    return(   
                      <div className ="event" key={todo.id}>
                        <h3>
                        <Link to = {`/todos/${todo.id}`} >{todo.title}</Link>
                        </h3>
                        <p>Описание: {todo.description}</p>
                        <p>Создан: {todo.createdBy}</p>
                        { this.props.user.role === todo.createdBy || this.props.user.role === 'admin' ?
                         <div>
                           <button onClick = {() => {this.props.deleteTodo(todo.id)}}>Удалить</button>
                           <button onClick = {() => {console.log(todo.id)}}>Редактировать</button>
                         </div>:''
                        }
                      </div>
                      );
                    }):''
                }
          </div>
          <WrapperFormTodo title='няка' description ='пошла гулять'/>
        </div>
      )
    }
  }

export const WrapperTodos = connect(mapStateToProps,mapDispatchToProps)(Todos);