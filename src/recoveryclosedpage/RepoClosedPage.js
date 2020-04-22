import React from "react";
import ClosedRepoTable from './components/ClosedRepoTable'
import Swal from "sweetalert2"

const backend_url = process.env.REACT_APP_BACKEND

class RepoClosedPage extends React.Component {
    constructor(){
        super();

        this.state = {
            closedRepos: [], 
            showAll: false,
        }
    }

    componentDidMount(){
        if(this.props.user.isadmin){
            this.getUserClosed();
        } else {
            this.getAllClosed();
        }
    }

    getAllClosed = () => {
        fetch(backend_url + 'repo_orders/all/closed_repos', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(repos  => this.setState({closedRepos: repos}))
        .catch(err => alert(err))
    }

    getUserClosed = () => {
        let id = this.props.user.id
        fetch(backend_url + `repo_orders/user/closed_repos/${id}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(repos  => this.setState({closedRepos: repos}))
        .catch(err => alert(err))
    }

    toggleAll = (status) => {
        if(status){
            this.getAllClosed();
        } else {
            this.getUserClosed();
        }

        this.setState({showAll: status})
    }

    archiveRepo = (id) => {
        fetch(backend_url + `repo_orders/archive/${id}`, {
            method: 'PATCH', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, 
            body: JSON.stringify({
                archive_record: true
            })
        })
        .then(resp => resp.json())
        .then(updated => {
            if(updated.id){
                let filtered = [...this.state.closedRepos].filter(record => record.id !== updated.id)
                if(filtered.length === 0){  //catches anytime the filtered removes all 
                    filtered = {message: 'No Vehicles Closed'}
                }
                this.setState({closedRepos: filtered})

                Swal.fire('Success', 'Vehicle has been archived', 'success')
            } else {
                Swal.fire('Error', 'Unable to update record', 'error')
            }
        })
        .catch(err => alert(err))
    }

    render(){
        return (
            <div>
                < ClosedRepoTable 
                isadmin={this.props.user.isadmin} 
                closedRepos={this.state.closedRepos}
                showAll={this.state.showAll}
                toggleAll={this.toggleAll}
                archiveRepo={this.archiveRepo}/>
            </div>
        )
    }
}

export default RepoClosedPage;