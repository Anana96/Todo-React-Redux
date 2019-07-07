import React from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import { getExistUser, getLoadingUser } from '../selectors'
import { aboutUser} from '../actions/user'
import ErrorBoundary from './ErrorBoundary'
import { WrapperTodo } from './Todo'
import { WrapperAllUsers } from './AllUsers'
import { WrapperFormTodo } from './FormTodo'
import { WrapperMain } from './Main'
import { WrapperTodos } from './AllTodos'
import { WrapperLogin } from './Login'
import PrivateRoute from './PrivateRoute'


const mapStateToProps = state =>{
    return {
        user: getExistUser(state),
        isLoading: getLoadingUser(state)
    }
}

const mapDispatchToProps = {aboutUser};

class App extends React.Component {
  componentDidMount() {
      this.props.aboutUser();
  }
    render(){
      let {isLoading, user} = this.props;
      return (
                <ErrorBoundary>   
                  {user === null ? <p className='start-spinner'>Loading...</p>:(
                  <Router>
                    <Route path='/login' component={WrapperLogin} loggedIn={user}/> 
                    <PrivateRoute exact path='/' component={WrapperMain} loggedIn={user}/>
                    <PrivateRoute exact path='/todos' component={WrapperTodos} loggedIn={user}/>
                    <PrivateRoute path='/todos/:id' component={WrapperTodo} loggedIn={user}/>
                    <PrivateRoute path='/users' component = {WrapperAllUsers} loggedIn={user}/>
                    <PrivateRoute path='/addTodo' component = {WrapperFormTodo} loggedIn={user}/>
                    <PrivateRoute path='/updateTodo/:id' component = {WrapperFormTodo} loggedIn={user}/>
                  </Router>
                  )}
                </ErrorBoundary>
      )
    }
}

export const WrapperApp = connect(mapStateToProps,mapDispatchToProps)(App);
