import React from "react"
import AdminMenu from "./AdminMenu"
import "./adminpage.css"

import PTPTracker from "./ptptracker/PTPTracker"
import ManageUsers from "./manageusers/ManageUsers"
import PTPManager from "./ptpmanager/PTPManager"

class AdminPage extends React.Component {
    constructor(){
        super();

        this.state = {
            showPage: "users"
        }
    }

    changePage = (page) => {
        this.setState({showPage: page})
    }

    renderSwitch(page) {
        switch(page) {
          case 'ptpTracker':
            return < PTPTracker />;
          case 'ptpManager':
            return < PTPManager />;
          default:
            return < ManageUsers />;
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