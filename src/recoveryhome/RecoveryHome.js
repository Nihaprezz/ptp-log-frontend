import React from "react";
import OutForRepoTable from "./OutRecordsTable";
import NewRepo from "./NewRepo"
import "./recovery_home.css"

const backend_url = process.env.REACT_APP_BACKEND

class RecoveryHome extends React.Component {
    constructor(){
        super();

        this.state = {
            newRepo: false, 
            recoveryUsers: [],
            activeRepos: []
        }
    }

    componentDidMount(){
        fetch(backend_url + 'users/recovery')
        .then(resp => resp.json())
        .then(usersArray => {
            let sorted = usersArray.sort((a,b) => a.username > b.username ? 1 : -1)
            this.setState({recoveryUsers: sorted})
        })
        .catch(err => alert(err))

        this.getActiveRepos()
    }

    toggleForm = () => {
        this.setState({newRepo: !this.state.newRepo})
    }

    getActiveRepos = () => {
        
        fetch(backend_url + 'repo_orders', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(activeRepos => {
            this.setState({activeRepos: activeRepos})
        })
        .catch(err => alert(err));
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
                    cancelForm={this.toggleForm}/>
                ): (
                    < OutForRepoTable 
                    activeRepos={this.state.activeRepos}/>
                )}

            </div>
        )
    }
}

export default RecoveryHome;
