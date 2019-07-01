import React from "react";
import Menu from "./Menu";
import { connect } from "react-redux";
import {getUser}from "../selectors"


let mapStateToProps = state => {
  return {
    user: getUser(state)
  };
};

 class Main extends React.Component {
    render() {
      return (
        <div className="container">
          <Menu/>
          <h1>Welcome {this.props.user.name}</h1>
        </div>
      );
    }
}

export const WrapperMain = connect(mapStateToProps)(Main);