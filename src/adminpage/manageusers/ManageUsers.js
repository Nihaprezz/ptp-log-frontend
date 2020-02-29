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
            <div>
                <h1>This is the ManageUsers</h1>

                <div className="ui list">
                    {this.state.allUsers.map(user => {
                        return < UserRecord key={user.id} userObj={user}/>
                    })}
                </div>
            </div>
        )
    }
}

export default ManageUsers