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
        this.setState({allUsers: this.props.allUsers})
    }

    changeToEdit = (user) => {
        this.setState({editForm: true, editUser: user})
    }

    toggleForm = () => {
        this.setState({editForm: false})
    }

    //CREATING A NEW USER
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

    //UPDATING A USER
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

    //Deleting user
    deleteUser = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'User will be deleted..', 
            icon: 'warning', 
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if(result.value){
               fetch(backend_url + `users/${user.id}`, {
                   method: 'DELETE',
                   headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
                }
               })
               .then(resp =>  resp.json())
               .then(data => {
                   const filtered = [...this.state.allUsers].filter(user => user.id !== data.id)
                   this.setState({allUsers: filtered})
               })
            }
        })
    }


    render(){

        return (
            <div className="user-page-container">

                <div className="users-info-container">
                    <h1>Manage Users</h1>

                    <div className="ui icon input">
                        <input type="text" placeholder="Search..."/>
                        <i className="circular search link icon"></i>
                    </div>

                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allUsers.map(user => {
                                return < UserRecord key={user.id} userObj={user} changeToEdit={this.changeToEdit}
                                deleteUser={this.deleteUser}/>
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="users-form-container">
                    {this.state.editForm ? < EditForm userObj={this.state.editUser} toggleForm={this.toggleForm} update={this.updateUser}/> : (
                        < NewUser submitUser={this.submitUser}/>
                    )}
                </div>
            </div>
        )
    }
}

export default ManageUsers