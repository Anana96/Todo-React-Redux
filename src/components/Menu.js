import React from "react";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {logout} from "../actions/user"
import { getUserName, getUserRole}from "../selectors"


let mapStateToProps = state => {
  return {
    name: getUserName(state),
    role: getUserRole(state)
  };
};

const mapDispatchToProps = {logout}


class Menu extends React.Component {
    render() {
      let {name,role} = this.props;
      return (
        <div className = "menu">
          <Link to='/' className="menu-bar">Homepage</Link>
          <Link to='/todos' className="menu-bar">Todos</Link>
          {role === 'admin'? <Link to='/users' className="menu-bar">Users</Link>: ''}
          <button onClick={this.props.logout} className="logout-button"><span className="login">{name} </span>Log Out</button>
        </div>
      );
    }
  }

export default Menu = connect(mapStateToProps,mapDispatchToProps)(Menu);