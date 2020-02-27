import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { checkUser } from "./redux/actions"

import Login from "./forms/Login"
import Home from "./homepage/Home"

class App extends React.Component {

  componentDidMount(){
    if (localStorage.getItem('jwt')){
      this.props.checkUser()
    }
  }

  render(){
    return (
      <div className="App">
        <Switch>
          < Route exact path="/" render={() => {
            return Array.isArray(this.props.currentUser) ? < Login /> : < Home />  
          }}/>
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     checkUser: () => {dispatch(checkUser())}
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
