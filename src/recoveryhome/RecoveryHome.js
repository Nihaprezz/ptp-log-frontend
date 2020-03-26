import React from "react";
import OutForRepoTable from "./OutRecordsTable";
import NewRepo from "./NewRepo"
import "./recovery_home.css"

const backend_url = process.env.REACT_APP_BACKEND

class RecoveryHome extends React.Component {
    constructor(){
        super();

        this.state = {
            newRepo: true, 
            recoveryUsers: []
        }
    }

    componentDidMount(){
        fetch(backend_url + 'users/recovery')
        .then(resp => resp.json())
        .then(usersArray => {
            this.setState({recoveryUsers: usersArray})
        })
        .catch(err => alert(err))
    }

    toggleForm = () => {
        this.setState({newRepo: !this.state.newRepo})
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
                    < NewRepo allCUs={this.props.allCUs} recoveryUsers={this.state.recoveryUsers}/>
                ): (
                    < OutForRepoTable />
                )}

            </div>
        )
    }
}

export default RecoveryHome;
