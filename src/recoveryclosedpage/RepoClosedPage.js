import React from "react";

const backend_url = process.env.REACT_APP_BACKEND

class RepoClosedPage extends React.Component {
    constructor(){
        super();

        this.state = {
            closedRepos: []
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

    render(){
        console.log(this.state.closedRepos)
        return (
            <div>
                This is the repo close page
            </div>
        )
    }
}

export default RepoClosedPage;