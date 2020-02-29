import React from "react";
import UserRecord from "./UserRecord"

const backend_url = `http://localhost:3001/`

class ManageUsers extends React.Component {
    constructor(){
        super();

        this.state = {
            allUsers : []
        }
    }

    componentDidMount(){
        fetch(backend_url + 'users', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({allUsers: data})
        })
    }

    render(){
        return (
            <div className="user-page-container">

                <div className="">
                    <h1>Manage Users</h1>
                    
                    {this.state.allUsers.map(user => {
                        return < UserRecord key={user.id} userObj={user}/>
                    })}
                </div>

                <div>
                    This is where the form will be
                </div>
            </div>
        )
    }
}

export default ManageUsers