import React from "react";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {logout} from "../actions"
import {getUser}from "../selectors"


let mapStateToProps = state => {
  return {
    user: getUser(state)
  };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
};

class Menu extends React.Component {
    render() {
      return (
        <div className = "menu">
          <Link to='/' className="menu-bar">Homepage</Link>
          <Link to='/todos' className="menu-bar">Todo</Link>
          <button onClick={() => {this.props.logout()}} className="logout-button"><span className="login">{this.props.user.name} </span>Log Out</button>
        </div>
      );
    }
  }

export default Menu = connect(mapStateToProps,mapDispatchToProps)(Menu);