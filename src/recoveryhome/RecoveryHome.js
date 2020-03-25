import React from "react";
import OutForRepoTable from "./OutRecordsTable"
import "./recovery_home.css"


class RecoveryHome extends React.Component {
    constructor(){
        super();

        this.state = {
            newRepo: false
        }
    }

    render(){
        return (
            <div>
                <h1>Out for Repo</h1>

                <div className="recovery-home-btn-cont">
                    <button className="ui primary button">New Repo Order</button>
                    <button className="ui button">Follow Ups</button>
                </div>

                {this.state.newRepo ? (
                    <div> new form </div>
                ): (
                    < OutForRepoTable />
                )}

            </div>
        )
    }
}

export default RecoveryHome;
