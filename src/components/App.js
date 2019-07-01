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
        user: state.user.set
    }
}


const NotFound = () =>
  <div className="container">
    <h3>404 page not found</h3>
  </div>

class App extends React.Component {
    render(){
      return (
              <Router>
               <Switch>
                <ErrorBoundary>
                  <Route path='/login' component={WrapperLogin}/> 
                  <PrivateRoute exact path='/' component={WrapperMain} loggedIn={this.props.user}/>
                  <PrivateRoute exact path='/todos' component={WrapperTodos} loggedIn={this.props.user}/>
                  <PrivateRoute path='/todos/:id' component={WrapperTodo} loggedIn={this.props.user}/>
                  {/* <Route component={NotFound} /> */}
                </ErrorBoundary>
                </Switch>
              </Router> 

      )
    }
}

export const WrapperApp = connect(mapStateToProps)(App);
