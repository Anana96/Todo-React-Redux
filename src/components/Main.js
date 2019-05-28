import React from "react";
import Menu from "./Menu";
import { connect } from "react-redux";


let mapStateToProps = state => {
  return {
    login: state.user.login
  };
};

 class Main extends React.Component {
    render() {
      return (
        <div className="container">
          <Menu/>
          <h1>Welcome {this.props.login}</h1>
        </div>
      );
    }
}

export const WrapperMain = connect(mapStateToProps)(Main);