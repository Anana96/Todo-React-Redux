import React from "react"
import ReactDOM from "react-dom"
import {Provider} from 'react-redux'
import configureStore from "./store/configureStore"
import {WrapperApp} from "./components/App"
import "./style/styles.scss"
import  'babel-polyfill'

const store = configureStore();

class Root extends React.Component {
  render() {
      return(
          <Provider store={store}>
            <WrapperApp/>
          </Provider>
      )
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<Root/>, rootElement);
