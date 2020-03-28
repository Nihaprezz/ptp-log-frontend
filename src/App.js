import React from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { checkUser, signOut, getAllCUs } from "./redux/actions"

import Login from "./forms/Login"
import Home from "./homepage/Home"
import Navbar from "./homepage/Navbar"
import RecoveryNavBar from "./homepage/RecoveryNavBar"
import RecoveryHome from "./recoveryhome/RecoveryHome"
import CreditUnions from "./creditunions/CreditUnionContainer"
import PTPEditContainer from "./promisetopay/PTPEditContainer"
import AdminPage from "./adminpage/AdminPage"
import AdminStatsPage from "./adminstats/AdminStatsPage"
import RegularStatsPage from "./regularstats/RegularStats"
import SkipTracePage from './skiptracepage/SkipTracePage';
import AdminSkipTrace from './adminskiptrace/AdminSkipTrace'
import SkipShowPage from "./skipshowpage/SkipShowPage"
import RecoveryRecord from "./recoveryshowpage/RecoveryRecordCont"


class App extends React.Component {

  componentDidMount(){
    if (localStorage.getItem('jwt')){
      this.props.checkUser()
      this.props.getAllCUs()
    }
  }

  signOut = () => {
    this.props.signOut()
  }

  render(){
    return (
      <div className="App">
        {this.props.currentUser.isrecovery ? (
          < RecoveryNavBar signOut={this.signOut} user={this.props.currentUser}/> 
        ) : (
          <Navbar signOut={this.signOut} user={this.props.currentUser}/>
        )}
      
        <Switch>
          < Route exact path="/" render={() => {
            return Array.isArray(this.props.currentUser) ? < Login /> : (
              this.props.currentUser.isrecovery ? (
                < RecoveryHome user={this.props.currentUser} allCUs={this.props.allCUs} />
              ) : (
                < Home user={this.props.currentUser} allCUs={this.props.allCUs}/> 
              )  
            )
          }}/>

          {/* CREDIT UNION ADDING AND DELETING  */}
          < Route exact path="/credit_unions" render={() => {
            return this.props.currentUser.isadmin ? < CreditUnions allCUs={this.props.allCUs}/> : <Redirect to="/" />
          }}/>

          < Route exact path="/admin_page" render={() => {
            return this.props.currentUser.isadmin ? < AdminPage allCUs={this.props.allCUs}/> :  <Redirect to="/" />
          }}/>

          < Route exact path="/promisetopay/:id" render={(props) => {
            let ptpID = props.match.params.id
            
            return Array.isArray(this.props.currentUser) ? < Login/> : (
              < PTPEditContainer ptpID={ptpID} allCUs={this.props.allCUs}/>  
            )
          }}/>

          < Route exact path="/admin_stats" render={() => {
            return this.props.currentUser.isadmin ? < AdminStatsPage user={this.props.currentUser} /> : <Redirect to="/" />
          }}/>

          < Route exact path="/user_stats" render={() => {
              return Array.isArray(this.props.currentUser) ? <Redirect to="/" /> : < RegularStatsPage user={this.props.currentUser}/>
          }}/>

          < Route exact path="/skip_trace" render={() => {
            return Array.isArray(this.props.currentUser) ? <Redirect to="/" />  : < SkipTracePage user={this.props.currentUser} allCUs={this.props.allCUs} />
          }}/>

          < Route exact path="/skip_manager" render={() => {
            return this.props.currentUser.isadmin? < AdminSkipTrace /> : < Redirect to="/" />
          }}/>

          < Route exact path="/skip/:id" render={(props) => {
            let skipID = props.match.params.id

            return < SkipShowPage skipID={skipID} />
          }} />

          {/* RECOVERY ROUTES */}
          < Route exact path="/repo_record/:id" render={(props) => {
            let recoveryId = props.match.params.id

            return < RecoveryRecord recoveryId={recoveryId} />
          }} />
   

          </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     checkUser: () => {dispatch(checkUser())},
     signOut: () => {dispatch(signOut())} , 
     getAllCUs: () => {dispatch(getAllCUs())}
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser, 
    allCUs: state.cuData
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
