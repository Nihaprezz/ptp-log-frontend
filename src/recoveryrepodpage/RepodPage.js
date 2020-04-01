import React from "react"
import RepossessedTable from "./components/ReposessedTable"
import RepodFilterBar from "./components/RepodFilterBar"

const backend_url = process.env.REACT_APP_BACKEND;

class RepodPage extends React.Component {
    constructor(){
        super();

        this.state = {
            repoRecords: []
        }
    }

    componentDidMount(){
        fetch(backend_url + '/repo_orders/active/all_repod', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(repodVehicles => {
            this.setState({repoRecords: repodVehicles})
        })
        .catch(err => alert(err))
    }

    render(){
        let { isadmin } = this.props.user;

        return (
            <div>
                <h1 style={{textAlign: 'left', width: '98%', margin: 'auto'}} className="ui dividing header">
                        Repossessed Vehicles
                </h1>  
       
                <p>Showing Records for : {this.props.user.username}</p>

                < RepodFilterBar />

                < RepossessedTable repoRecords={this.state.repoRecords} isadmin={isadmin} />
            </div>
        )
    }
}

export default RepodPage