import React from "react";
import UserRecord from "./UserRecord"
import NewUser from "../../forms/NewUser"
import EditForm from "../../forms/EditForm"

import Swal from "sweetalert2"
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

    toggleForm = () => {
        this.setState({editForm: false})
    }

    //NEED TO ADD THE CORRECT FIELD 
    submitUser = (user) => {
        fetch(backend_url + "api/v1/users", {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, 
            body: JSON.stringify({
                user: {
                    username: user.username, 
                    password: user.password, 
                    isadmin: user.isadmin
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.error){
                Swal.fire('Failed', `Error: ${data.error}`, 'error')
            } else {
                Swal.fire('Created', `User: ${data.user.username} was created!`, 'success')
                this.setState({allUsers: [...this.state.allUsers, data.user]})
            }
        })
    }

    updateUser = (user) => {
        fetch(backend_url + `users/${user.id}`, {
            method: "PATCH", 
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json',
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
            }, 
            body: JSON.stringify({
                user : {
                    username: user.user, 
                    password: user.password, 
                    isadmin: user.isadmin
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.id){
                Swal.fire('Updated', 'User has been updated!', 'success')
            } else {
                Swal.fire('Error!', `${data.message}`, 'error')
            }
        })

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
                    {this.state.editForm ? < EditForm userObj={this.state.editUser} toggleForm={this.toggleForm} update={this.updateUser}/> : (
                        < NewUser submitUser={this.submitUser}/>
                    )}
                </div>
            </div>
        )
    }
}

export default ManageUsers