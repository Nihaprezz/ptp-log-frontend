import React from "react";
import UserRecord from "./UserRecord"
import NewUser from "../../forms/NewUser"
import EditForm from "../../forms/EditForm"

import Swal from "sweetalert2"
const backend_url = process.env.REACT_APP_BACKEND

class ManageUsers extends React.Component {
    constructor(){
        super();

        this.state = {
            editForm: false,
            editUser: [],
            allUsers: [], 
            searchText: ""
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
                    isadmin: user.isadmin,
                    isrecovery: user.isrecovery
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.error){
                Swal.fire('Failed', `Error: ${data.error}`, 'error')
            } else {
                Swal.fire('Created', `User: ${data.user.username} was created!`, 'success')
                this.props.updateUsersArray(data, "newuser") //updates container.
                this.setState({allUsers: [...this.state.allUsers, data.user]}) //updates this comp.
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
                    isadmin: user.isadmin,
                    isrecovery: user.isrecovery
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.id){
                //remove old record with filter and then add the new updated record.
                let updatedArr = [...this.state.allUsers].filter(user => user.id !== data.id)
                updatedArr.push(data)
  
                this.setState({allUsers: updatedArr})

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
                    this.props.updateUsersArray(data, "deleted") //updates container

                    let filtered = this.state.allUsers.filter(record => record.id !== data.id)
                    this.setState({allUsers: filtered}) //updates component
               })
            }
        })
    }

    handleSearchText = (e) => {
        this.setState({searchText: e.currentTarget.value})
    }

    render(){
        let usersArray = this.state.allUsers.filter(user => user.username.includes(this.state.searchText))

        return (
            <div>

            {this.state.editForm ? (
                < EditForm userObj={this.state.editUser} toggleForm={this.toggleForm} update={this.updateUser}/>
            ) : (
                <div className="user-page-container">
                
                <div className="users-info-container">
                <h1>Manage Users</h1>

                    <div className="ui icon input">
                        <input onChange={(e) => this.handleSearchText(e)} 
                        type="text" placeholder="Search..."/>
                        <i className="circular search link icon"></i>
                    </div>

                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th> User Name </th>
                                <th> Admin </th>
                                <th> Recovery Team </th>
                                <th> Edit </th>
                                <th> Delete </th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersArray.map(user => {
                                return < UserRecord key={user.id} userObj={user} changeToEdit={this.changeToEdit}
                                deleteUser={this.deleteUser}/>
                            })}
                        </tbody>
                    </table>
                </div> 

                <div className="users-form-container">
                    < NewUser submitUser={this.submitUser}/>
                </div>

                </div>
            )}

            </div>
        )
    }
}

export default ManageUsers