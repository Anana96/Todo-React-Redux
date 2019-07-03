import React from "react"
import { connect } from "react-redux"
import Menu from "./Menu"
import {allUsers} from "../actions"
import {getUsers, getLoadingUser, getErrorUser} from "../selectors"


const mapDispatchToProps = {
    allUsers
};

const  mapStateToProps = state => {
  return {
    users: getUsers(state),
    isLoading: getLoadingUser(state),
    error: getErrorUser(state)
  };
};

class AllUsers extends React.Component{
  componentDidMount() {
    this.props.allUsers();
  }
  
  render() {
    let {users,error, isLoading} = this.props;
    return (
      <div className="container">
        <Menu/>
        <h1>All users:</h1>
        <div className="container-users">
              { isLoading? <p>Loading...</p>:
                error?
                <h2> {error} </h2>
                :
                users? 
                users.map(user => {
                  return(   
                    <div className ="users" key={user.name}>
                      <h3>Name: {user.name}</h3>
                      <p>Role: {user.role}</p>
                    </div>
                  );
                }):''
              }
        </div>
      </div>
    )
  }
}

export const WrapperAllUsers = connect(mapStateToProps,mapDispatchToProps)(AllUsers);