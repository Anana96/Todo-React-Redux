import React from "react";
import { Form, Field, Formik } from "formik"
import { Redirect } from 'react-router'
import { connect } from "react-redux";
import * as yup from "yup"
import {login,aboutUser} from "../actions/user"
import {getExistUser,getErrorUser,getLoadingUser, getUserRole} from "../selectors/index"
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
      role: getUserRole(state),
      error: getErrorUser(state),
      isLoading: getLoadingUser(state)
    };
  };


 const mapDispatchToProps = {login, aboutUser};

 class Login extends React.Component{
    render(){
        let {user,role,isLoading,aboutUser, login} = this.props;
        if(role)
          return (<Redirect to="/"/>);
        if(user && !isLoading)
          aboutUser();
        return( 
            <div className="form">
              <h1>Login</h1>
              <Formik   
                initialValues={{ login: '', password: '' }}
                onSubmit={(value, {setSubmitting}) => {
                  setSubmitting(true);
                  login(value, {setSubmitting});
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
                isSubmitting,
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
                    <button type="submit" className="button-form" disabled={isSubmitting}> Submit </button>
                  </div>
                  </Form>
              )}
              />
            </div>
        )
    }
}
export const WrapperLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

