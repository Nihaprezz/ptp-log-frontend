import React from "react";
import OutForRepoTable from "./OutRecordsTable";
import NewRepo from "./NewRepo"
import "./recovery_home.css"
import Swal from "sweetalert2"

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

        this.getActiveRepos()
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
            this.setState({activeRepos: activeRepos})
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
            this.setState({activeHolds: activeHolds})
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
            }
        })
    }

    render(){
        return (
            <div>
                <h1>Out for Repo</h1>

                <div className="recovery-home-btn-cont">
                    <button className="ui primary button" onClick={() => this.toggleForm()}>New Repo Order</button>
                    <button className="ui button">Follow Ups</button>
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
                    currentUser={this.props.user}/>
                )}

            </div>
        )
    }
}

export default RecoveryHome;
