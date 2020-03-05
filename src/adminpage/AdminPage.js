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
            showPage: "ptpManager", 
            allUsers: [],
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

    renderSwitch(page) {
        switch(page) {
          case 'ptpTracker':
            return < PTPTracker allUsers={this.state.allUsers}/>;
          case 'ptpManager':
            return < PTPManager allUsers={this.state.allUsers}/>;
          default:
            return < ManageUsers allUsers={this.state.allUsers}/>;
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