import React from "react";
import { Form, Field, Formik } from "formik"
import { connect } from "react-redux"
import { Redirect } from 'react-router'
import * as yup from "yup"
import { getErrorTodos, getTodo, getResultOperation, getIsLoadingTodos} from "../selectors";
import {updateTodo, addTodo,fetchGetTodoById} from "../actions"
import Menu from "./Menu"

const TodoValidation = yup.object().shape({
    title: yup.string()
      .required('Загаловок не введен'),
    description: yup.string()
      .required('Описание не введено')
  });

const  mapStateToProps = state => {
    return {
        error: getErrorTodos(state),
        isLoading: getIsLoadingTodos(state),
        todo: getTodo(state),
        resultOperation: getResultOperation(state)
    };
};

const mapDispatchToProps = {
    addTodo,
    updateTodo,
    getTodo: fetchGetTodoById
};



class FormTodo extends React.Component{

    componentDidMount() {
        let id = this.props.match.params.id;
        if(id){
          this.props.getTodo(id);
        }
    }

    render(){
      let {todo, error, isLoading,resultOperation} = this.props;
      if (resultOperation)
        return (<Redirect to="/todos"/>);
      let initTitle = '', initDesctiption = '';
      let id = this.props.match.params.id;
      if(todo && id){
        initTitle = todo.title;
        initDesctiption = todo.description;
      }
      return( 
        <div className="container">
        <Menu/>
          <div className="form-add-todo">
            <h1>Form todo:</h1>
            {error && (<div className="input-feedback">{error}</div>)}
            {isLoading && <p>Loading...</p>}
            <Formik   
              enableReinitialize={true}
              initialValues={{ title: initTitle, description: initDesctiption }}
              onSubmit={(value,{setSubmitting}) => {
                  setSubmitting(true);
                  todo && id ? this.props.updateTodo(id, value, {setSubmitting}):this.props.addTodo(value, {setSubmitting});
              }}
              validationSchema={TodoValidation}
              render = {({touched,errors,values,handleChange,
                          handleBlur,handleSubmit,handleReset,isSubmitting
              })  => (
                <Form onSubmit={handleSubmit}>
                <Field  type="text" name="title"  value = {values.title} onChange={handleChange} onBlur={handleBlur} className={ errors.title && touched.title ? 'text-input error' : 'text-input'}/>
                <div className="input-feedback">{errors.title}</div>
                <Field  component="textarea" rows="5" col="5" name="description" value = {values.description} onChange={handleChange} onBlur={handleBlur} className={ errors.description && touched.description ? 'text-input error' : 'text-input'}/>
                <div className="input-feedback">{errors.description}</div>
                <button type="button" className="outline button-form" onClick={handleReset}> Reset</button>
                <button type="submit" className="button-form" disabled={isSubmitting}> Submit </button>
                </Form>
              )}
             />
            </div>
        </div>
        )
    }
}


export const WrapperFormTodo = connect(mapStateToProps,mapDispatchToProps)(FormTodo);