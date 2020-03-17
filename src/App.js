import React from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { checkUser, signOut } from "./redux/actions"

import Login from "./forms/Login"
import Home from "./homepage/Home"
import Navbar from "./homepage/Navbar"
import CreditUnions from "./creditunions/CreditUnionContainer"
import PTPEditContainer from "./promisetopay/PTPEditContainer"
import AdminPage from "./adminpage/AdminPage"
import AdminStatsPage from "./adminstats/AdminStatsPage"
import RegularStatsPage from "./regularstats/RegularStats"
import SkipTracePage from './skiptracepage/SkipTracePage';
import AdminSkipTrace from './adminskiptrace/AdminSkipTrace'
import SkipShowPage from "./skipshowpage/SkipShowPage"

const backend_url = process.env.REACT_APP_BACKEND

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      allCUs: []
    }
  }

  componentDidMount(){
    if (localStorage.getItem('jwt')){
      this.props.checkUser()

      fetch(backend_url + 'creditunions',{
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
      })
      .then(resp => resp.json())
      .then(data => this.setState({allCUs: data}))
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
            return Array.isArray(this.props.currentUser) ? < Login /> : (
              < Home user={this.props.currentUser} allCUs={this.state.allCUs}/>  
            )
          }}/>

          {/* CREDIT UNION ADDING AND DELETING  */}
          < Route exact path="/credit_unions" render={() => {
            return this.props.currentUser.isadmin ? < CreditUnions allCUs={this.state.allCUs}/> : <Redirect to="/" />
          }}/>

          < Route exact path="/admin_page" render={() => {
            return this.props.currentUser.isadmin ? < AdminPage allCUs={this.state.allCUs}/> :  <Redirect to="/" />
          }}/>

          < Route exact path="/promisetopay/:id" render={(props) => {
            let ptpID = props.match.params.id
            
            return Array.isArray(this.props.currentUser) ? < Login/> : (
              < PTPEditContainer ptpID={ptpID} allCUs={this.state.allCUs}/>  
            )
          }}/>

          < Route exact path="/admin_stats" render={() => {
            return this.props.currentUser.isadmin ? < AdminStatsPage user={this.props.currentUser} /> : <Redirect to="/" />
          }}/>

          < Route exact path="/user_stats" render={() => {
              return Array.isArray(this.props.currentUser) ? <Redirect to="/" /> : < RegularStatsPage user={this.props.currentUser}/>
          }}/>

          < Route exact path="/skip_trace" render={() => {
            return Array.isArray(this.props.currentUser) ? <Redirect to="/" />  : < SkipTracePage user={this.props.currentUser} allCUs={this.state.allCUs} />
          }}/>

          < Route exact path="/skip_manager" render={() => {
            return this.props.currentUser.isadmin? < AdminSkipTrace /> : < Redirect to="/" />
          }}/>

          < Route exact path="/skip/:id" render={(props) => {
            let skipID = props.match.params.id

            return < SkipShowPage skipID={skipID} />
          }} />

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
