import React from "react";
import Menu from "./Menu";
import { connect } from "react-redux";
import {getUserName, getUserRole}from "../selectors"


const mapStateToProps = state => {
  return {
    name: getUserName(state),
    role: getUserRole(state)
  };
};

 class Main extends React.Component {
    render() {
      let {name,role} = this.props;
      return (
        <div className="container main">
          <Menu/>
          <h1>Welcome {name}</h1>
          <h2>Role of user: {role}</h2>
        </div>
      );
    }
}

export const WrapperMain = connect(mapStateToProps)(Main);