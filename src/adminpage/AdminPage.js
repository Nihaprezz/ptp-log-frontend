import React from "react"
import AdminMenu from "./AdminMenu"
import "./adminpage.css"

import PTPTracker from "./ptptracker/PTPTracker"
import ManageUsers from "./manageusers/ManageUsers"
import PTPManager from "./ptpmanager/PTPManager"

const backend_url = `http://localhost:3001/`

class AdminPage extends React.Component {
    constructor(){
        super();

        this.state = {
            showPage: "ptpTracker", 
            allUsers: []
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

    changePage = (page) => {
        this.setState({showPage: page})
    }

    //handles users being added and removed from the users state.
    updateUsersArray = (user, type) => {
        if (type === "deleted"){
            let filtered = this.state.allUsers.filter(record => record.id !== user.id)
            this.setState({allUsers: filtered})
        } else if (type === "newuser"){
           this.setState({allUsers: [...this.state.allUsers, user.user]})
        } 
    }

    renderSwitch(page) {
        switch(page) {
          case 'ptpTracker':
            return < PTPTracker allUsers={this.state.allUsers}/>;
          case 'ptpManager':
            return < PTPManager allUsers={this.state.allUsers} allCUs={this.props.allCUs}/>;
          default:
            return < ManageUsers allUsers={this.state.allUsers} updateUsersArray={this.updateUsersArray}/>;
        }
    }

    render(){
        return (
            <div>
                < AdminMenu changePage={this.changePage}/>

                {this.renderSwitch(this.state.showPage)}
            </div>

        )
    }
}

export default AdminPage