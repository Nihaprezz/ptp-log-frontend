import React from "react";
import ClosedRepoTable from './components/ClosedRepoTable'

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

    render(){
        return (
            <div>
                < ClosedRepoTable 
                isadmin={this.props.user.isadmin} 
                closedRepos={this.state.closedRepos}
                showAll={this.state.showAll}
                toggleAll={this.toggleAll}/>
            </div>
        )
    }
}

export default RepoClosedPage;