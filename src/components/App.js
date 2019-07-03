import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {  Redirect } from 'react-router'
import {connect} from 'react-redux'
import {WrapperMain} from "./Main"
import {WrapperTodos} from "./AllTodos"
import {WrapperLogin} from "./Login"
import ErrorBoundary from "./ErrorBoundary"
import {WrapperTodo} from "./Todo";
import {getExistUser} from '../selectors'
import { WrapperAllUsers } from "./AllUsers";
import { WrapperFormTodo } from "./FormTodo";

const PrivateRoute = ({component:Component, loggedIn, ...rest}) => {
  return(
    <Route
      {...rest}
      render={(props) => {
        return loggedIn? <Component{...props}/>:<Redirect to='/login'/> }}
    />
  )
}


const mapStateToProps = state =>{
    return {
        user: getExistUser(state)
    }
}


class App extends React.Component {
    render(){
      return (
              <Router>
                <ErrorBoundary>
                  <Route path='/login' component={WrapperLogin}/> 
                  <PrivateRoute exact path='/' component={WrapperMain} loggedIn={this.props.user}/>
                  <PrivateRoute exact path='/todos' component={WrapperTodos} loggedIn={this.props.user}/>
                  <PrivateRoute path='/todos/:id' component={WrapperTodo} loggedIn={this.props.user}/>
                  <PrivateRoute path='/users' component = {WrapperAllUsers} loggedIn={this.props.user}/>
                  <PrivateRoute path='/addTodo' component = {WrapperFormTodo} loggedIn={this.props.user}/>
                  <PrivateRoute path='/updateTodo/:id' component = {WrapperFormTodo} loggedIn={this.props.user}/>
                </ErrorBoundary>
              </Router> 

      )
    }
}

export const WrapperApp = connect(mapStateToProps)(App);
