import React from "react"
import RepossessedTable from "./components/ReposessedTable"
import RepodFilterBar from "./components/RepodFilterBar"

const backend_url = process.env.REACT_APP_BACKEND;

class RepodPage extends React.Component {
    constructor(){
        super();

        this.state = {
            repoRecords: [],
            showAll: false,
        }
    }

    componentDidMount(){
        if(this.props.user.isadmin){
            this.fetchUserRepos()
        } else {
            this.fetchAllRepos()
        }
    }

    fetchUserRepos = () => {
        let id = this.props.user.id
        fetch(backend_url + `/repo_orders/active/all_repod/${id}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(myRepodVehs => {
            this.setState({repoRecords: myRepodVehs})
        })
        .catch(err => alert(err))
    }

    fetchAllRepos = () => {
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

    toggleShowAll = () => {
       this.setState({showAll: !this.state.showAll}, () => {
           if(!this.state.showAll){
               this.fetchUserRepos()
           } else {
               this.fetchAllRepos()
           }
       })
    }

    render(){
        let { isadmin } = this.props.user;
        let btnText = this.state.showAll ? 'Show Your Repos' : 'Show All'
        
        return (
            <div>
                <h1 style={{textAlign: 'left', width: '98%', margin: 'auto'}} className="ui dividing header">
                        Repossessed Vehicles
                </h1>  
                
                <div style={{textAlign: 'left', padding: '1%'}}>
                    {isadmin ? (
                            <button className="ui secondary button" onClick={() => this.toggleShowAll()}>
                                {btnText}
                            </button>
                    ) : null}
                </div>

                < RepodFilterBar />

                < RepossessedTable repoRecords={this.state.repoRecords} isadmin={isadmin} />
            </div>
        )
    }
}

export default RepodPage