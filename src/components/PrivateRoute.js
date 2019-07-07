import React from 'react'
import {  Redirect } from 'react-router'
import {  Route } from 'react-router-dom'

const PrivateRoute = ({component:Component, loggedIn, ...rest}) => {
    return(
      <Route
        {...rest}
        render={(props) => {
          return loggedIn? <Component{...props}/>:<Redirect to='/login'/> }}
      />
    )
}
export default PrivateRoute;