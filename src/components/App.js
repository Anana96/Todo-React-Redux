import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Route } from 'react-router-dom'
import {  Redirect } from 'react-router'
import {connect} from 'react-redux'
import {WrapperMain} from "./Main"
import {WrapperTodo} from "./AllTodos"
import {WrapperLogin} from "./Login"

const PrivateRoute = ({component:Component, loggedIn, ...rest}) => {
  return(
    <Route
      {...rest}
      render={(props) => {
        return loggedIn?(<Component{...props}/>):<Redirect to='/login'/> }}
    />
  )
}


const mapStateToProps = state =>{
    return {
        user: state.user.set
    }
}


class App extends React.Component {
    render(){
      return (
              <Router>
                <Route path='/login' component={WrapperLogin}/>
                <PrivateRoute exact path='/' component={WrapperMain} loggedIn={this.props.user}/>
                <PrivateRoute path='/todo' component={WrapperTodo} loggedIn={this.props.user}/>
              </Router> 
      )
    }
}

export const WrapperApp = connect(mapStateToProps)(App);
