import React from "react";
import UserRecord from "./UserRecord"
import NewUser from "../../forms/NewUser"
import EditForm from "../../forms/EditForm"

const backend_url = `http://localhost:3001/`

class ManageUsers extends React.Component {
    constructor(){
        super();

        this.state = {
            allUsers : [],
            editForm: false,
            editUser: []
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

    changeToEdit = (user) => {
        this.setState({editForm: true, editUser: user})
    }


    render(){

        return (
            <div className="user-page-container">

                <div className="">
                    <h1>Manage Users</h1>

                    {this.state.allUsers.map(user => {
                        return < UserRecord key={user.id} userObj={user} changeToEdit={this.changeToEdit}/>
                    })}
                </div>

                <div>
                    {this.state.editForm ? < EditForm userObj={this.state.editUser} /> : (
                        < NewUser />
                    )}
                </div>
            </div>
        )
    }
}

export default ManageUsers