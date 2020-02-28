import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { checkUser } from "./redux/actions"

import Login from "./forms/Login"
import Home from "./homepage/Home"
import CreditUnions from "./creditunions/CreditUnionContainer"
import PTPEditContainer from "./promisetopay/PTPEditContainer"

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
            return Array.isArray(this.props.currentUser) ? < Login /> : < Home user={this.props.currentUser}/>  
          }}/>

          < Route exact path="/credit_unions" render={() => {
            return this.props.currentUser.isadmin ? < CreditUnions /> : < Login />
          }}/>

          < Route exact path="/promisetopay/:id" render={(props) => {
            let ptpID = props.match.params.id
            return Array.isArray(this.props.currentUser) ? < Login /> : < PTPEditContainer ptpID={ptpID}/>  
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
