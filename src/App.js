import React from 'react';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { checkUser, signOut } from "./redux/actions"

import Login from "./forms/Login"
import Home from "./homepage/Home"
import Navbar from "./homepage/Navbar"
import CreditUnions from "./creditunions/CreditUnionContainer"
import PTPEditContainer from "./promisetopay/PTPEditContainer"
import AdminPage from "./adminpage/AdminPage"

class App extends React.Component {

  componentDidMount(){
    if (localStorage.getItem('jwt')){
      this.props.checkUser()
    }
  }

  signOut = () => {
    this.props.signOut()
  }

  render(){
    return (
      <div className="App">
        <Navbar signOut={this.signOut} user={this.props.currentUser}/>

        <Switch>
          < Route exact path="/" render={() => {
            return Array.isArray(this.props.currentUser) ? < Login /> : < Home user={this.props.currentUser}/>  
          }}/>

          < Route exact path="/credit_unions" render={() => {
            return this.props.currentUser.isadmin ? < CreditUnions /> : < Login />
          }}/>

          < Route exact path="/admin_page" render={() => {
            return this.props.currentUser.isadmin ? < AdminPage /> : < Login />
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
     checkUser: () => {dispatch(checkUser())},
     signOut: () => {dispatch(signOut())} 
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
