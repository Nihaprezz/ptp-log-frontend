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
import RepodPage from "./recoveryrepodpage/RepodPage"
import AuctionPage from "./recoveryauctionpage/AuctionPage"
import AuctionShowPage from "./auctionshowpage/AuctionShowPage"
import SoldPage from "./recoverysoldpage/SoldPage"
import SoldShowPage from "./soldshowpage/SoldShowPage"
import RepoClosedPage from "./recoveryclosedpage/RepoClosedPage"
import RecoveryStats from "./recoverystatspage/RecoveryStats"
import RecoverySearch from "./recoverysearchpage/RecoverySearch"
import FollowUpPage from './recoveryfollowups/FollowUpPage';


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

          {/* first checks if the user is admin. Then checks is user is recovery, if both are false then will redirect.*/}
          < Route exact path="/admin_stats" render={() => {
            return this.props.currentUser.isadmin ? < AdminStatsPage user={this.props.currentUser} /> : (
              this.props.currentUser.isrecovery ? < AdminStatsPage user={this.props.currentUser} /> : <Redirect to="/" />
            )
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

          < Route exact path="/repossessed" render={() => {
             return this.props.currentUser.isrecovery ? < RepodPage user={this.props.currentUser} /> : 
             ( <Redirect to="/" /> )
          }} />

          < Route exact path="/auction" render={() => {
            return this.props.currentUser.isrecovery ? < AuctionPage user={this.props.currentUser} /> : <Redirect to="/" />  
          }} />

          < Route exact path="/auction_record/:id" render={(props) => {
            let auctionID = props.match.params.id

            return < AuctionShowPage auctionID={auctionID} />
          }} />

          < Route exact path="/sold" render={() => {
            return this.props.currentUser.isrecovery ? < SoldPage user={this.props.currentUser} /> : <Redirect to="/" />  
          }} />

          < Route exact path="/sold_record/:id" render={(props) => {
            let soldID = props.match.params.id
            return < SoldShowPage soldID={soldID}/>
          }} />

          < Route exact path="/closed" render={() => {
            return this.props.currentUser.isrecovery ? < RepoClosedPage user={this.props.currentUser} /> : (
            <Redirect to="/" />  )
          }} />

          < Route exact path="/recovery_stats" render={() => {
            return this.props.currentUser.isrecovery ? < RecoveryStats user={this.props.currentUser} /> : (
            <Redirect to="/" />  )
          }} />

          < Route exact path="/search_repo" render={() => {
            return this.props.currentUser.isrecovery ? < RecoverySearch allCUs={this.props.allCUs}/> : <Redirect to="/" />  
          }} />

          < Route exact path="/repo_follow_ups" render={() => {
            return this.props.currentUser.isrecovery ? < FollowUpPage user={this.props.currentUser} /> : <Redirect to="/" />  
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
