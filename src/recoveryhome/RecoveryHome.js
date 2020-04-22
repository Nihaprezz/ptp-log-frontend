import React from "react";
import { Link } from "react-router-dom"
import OutForRepoTable from "./OutRecordsTable";
import NewRepo from "./NewRepo"
import "./recovery_home.css"
import Swal from "sweetalert2"
import { withRouter } from "react-router-dom"
import { dataToCsv } from "../utils/createCSV"

const backend_url = process.env.REACT_APP_BACKEND

class RecoveryHome extends React.Component {
    constructor(){
        super();

        this.state = {
            newRepo: false, 
            recoveryUsers: [],
            activeRepos: [],
            activeHolds: [],
            showHold: false,
        }
    }

    componentDidMount(){
        fetch(backend_url + 'users/recovery')
        .then(resp => resp.json())
        .then(usersArray => {
            let filtered = usersArray.filter(user => user.isadmin === true)
            let sorted = filtered.sort((a,b) => a.username > b.username ? 1 : -1)
            this.setState({recoveryUsers: sorted})
        })
        .catch(err => alert(err))

        //state will change depending on what comes in from the router.
        if(this.props.location.state === "hold_status"){
            this.getActiveHolds()
            this.setState({showHold: true})
        } else {
            this.getActiveRepos()
        }
    }

    toggleForm = () => {
        this.setState({newRepo: !this.state.newRepo})
    }

    getActiveRepos = () => {
        Swal.showLoading()
        fetch(backend_url + 'repo_orders')
        .then(resp => resp.json())
        .then(activeRepos => {  
            Swal.close()  
            if(activeRepos.message){
                this.setState({activeRepos: activeRepos})
            } else {
                const sorted = activeRepos.sort((a,b) => a.creditunion.name > b.creditunion.name ? 1 : -1)     
                this.setState({activeRepos: sorted})   
            }
        })
        .catch(err => alert(err));
    }

    getActiveHolds = () => {
        Swal.showLoading()
        fetch(backend_url + 'repo_orders/active/holds', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json' 
            }
        })
        .then(resp => resp.json())
        .then(activeHolds => {
            Swal.close()  
            if(activeHolds.message){
                this.setState({activeHolds: activeHolds})
            } else {
                const sorted = activeHolds.sort((a,b) => a.creditunion.name > b.creditunion.name ? 1 : -1)
                this.setState({activeHolds: sorted})    
            }
        })
    }

    updateRepos = (newRepo) => {
        if (this.state.activeRepos.message){
            let newArr = []
            newArr.push(newRepo)
            this.setState({activeRepos: newArr})
        } else {
            this.setState({activeRepos: [...this.state.activeRepos, newRepo]})
        }
    }

    toggleActiveRepos = (status) => {
        this.setState({showHold: status}, function(){
            if(status){
                this.getActiveHolds()
            } else {
                this.getActiveRepos()
            }
        })
    }

    startCSV = () => {
        dataToCsv(this.state.activeRepos)
    }

    sortByCU = () => {
        let {showHold, activeRepos, activeHolds} = this.state;

        if(showHold) {
            let holdSorted = activeHolds.sort((a,b) => a.creditunion.name > b.creditunion.name ? 1 : -1)
            this.setState({activeHolds: holdSorted})
        } else {
            let repoSorted = activeRepos.sort((a, b) => a.creditunion.name > b.creditunion.name ? 1 : -1)
            this.setState({activeRepos: repoSorted})
        }
    }

    sortByDate = () => {
        let {showHold, activeRepos, activeHolds} = this.state;

        if(showHold){
            let holdSortedDates = activeHolds.sort((a,b) => a.created_at > b.created_at ? 1 : -1)
            this.setState({activeHolds: holdSortedDates})
        } else {
            let repoSortedDates = activeRepos.sort((a,b) => a.created_on > b.created_on ? 1 : -1)
            this.setState({activeRepos: repoSortedDates})
        }
    }

    render(){
        return (
            <div>
                <h1 style={{width: '98%', margin: 'auto'}} className="ui dividing header">
                    Out For Repossession
                </h1> 
     
                <div className="recovery-home-btn-cont">
                    <button className="ui primary button" onClick={() => this.toggleForm()}>New Repo Order</button>
                    <button className="ui secondary button" onClick={() => this.startCSV()}>Download CSV</button>
                    <Link className="ui button" to="/repo_follow_ups">Follow Ups</Link>
                </div>

                {this.state.newRepo ? (
                    < NewRepo 
                    currentUser={this.props.user}
                    allCUs={this.props.allCUs} 
                    recoveryUsers={this.state.recoveryUsers}
                    cancelForm={this.toggleForm}
                    updateRepos={this.updateRepos}/>
                ): (
                    < OutForRepoTable 
                    activeRepos={this.state.activeRepos}
                    showHold={this.state.showHold}
                    toggleActiveRepos={this.toggleActiveRepos}
                    activeHolds={this.state.activeHolds}
                    currentUser={this.props.user}
                    sortByCU={this.sortByCU}
                    sortByDate={this.sortByDate}/>  
                )}

            </div>
        )
    }
}

export default withRouter(RecoveryHome);
