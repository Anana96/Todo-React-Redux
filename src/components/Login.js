import React from "react";
import { Form, Field, Formik } from "formik"
import { Redirect } from 'react-router'
import { connect } from "react-redux";
import * as yup from "yup"
import {fetchLogin} from "../actions"
import {getExistUser,getErrorUser,getSubmiting} from "../selectors/index"
import "../style/form-style.scss"


const loginValidation = yup.object().shape({
  login: yup.string()
    .required('Логин не введен'),
  password: yup.string()
    .min(4, 'Пароль должен быть больше 4 символов')
    .max(16, 'Пароль превышает максимальную длину')
    .required('Пароль не введен')
})


 const  mapStateToProps = state => {
    return {
      user: getExistUser(state),
      error: getErrorUser(state),
      sumbititing: getSubmiting(state)
    };
  };


 const mapDispatchToProps = {fetchLogin};

 class Login extends React.Component{
    render(){
        if(this.props.user){
          return (<Redirect to="/"/>);
        }
        return( 
            <div className="form">
              <h1>Login</h1>
              <Formik   
                initialValues={{ login: '', password: '' }}
                onSubmit={(value, {setSubmitting}) => {
                  this.props.fetchLogin(value);
                  setSubmitting(this.props.setSubmitting);
               }}
              validationSchema={loginValidation}
              render = {({
                touched = touched,
                errors,
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
                error = this.props.error
              })  => (
                  <Form onSubmit={handleSubmit}>
                  <Field  type="text" name="login" placeholder="login" value = {values.login} onChange={handleChange} onBlur={handleBlur} className={ errors.login && touched.login ? 'text-input error' : 'text-input'}/>
                  <div className="input-feedback">{errors.login}</div>
                  <Field type="password" name="password" placeholder="password"   value = {values.password} onChange={handleChange} onBlur={handleBlur} className={ errors.password && touched.password ? 'text-input error' : 'text-input'}/>
                  <div className="input-feedback">{errors.password}</div>
                  <div>
              
                  {error && (
                  <div className="input-feedback">{error}</div>)}
                    <button type="button" className="outline button-form" onClick={handleReset}> Reset</button>
                    <button type="submit" className="button-form" disabled={this.props.sumbititing}> Submit </button>
                  </div>
                  </Form>
              )}
              />
            </div>
        )
    }
}
export const WrapperLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

