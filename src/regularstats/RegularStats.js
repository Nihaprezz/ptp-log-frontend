import React from "react";
import PTPStatsTable from "./PTPStatsTable";
import SkipStatsTable from "../adminstats/AdminSkipTable" // <-- RE USING ADMIN SKIP TABLE IN ADMINSTATS FOLDER
import "./regularstats.css"
import { getMonth } from "../utils/index"


const backend_url = process.env.REACT_APP_BACKEND

class RegularStats extends React.Component {
    constructor(){
        super()

        this.state = {
            userPTPStats: [],
            userSkipStats: [],
            showSkips: false
        }
    }

    componentDidMount(){
        fetch(backend_url + `stats/${this.props.user.id}`)
        .then(resp => resp.json())
        .then(data => {
            let ptpStats = this.sortCUs(data.ptpStats);
            let skipStats = this.sortCUs(data.skipStats);
            this.setState({userPTPStats: ptpStats, userSkipStats: skipStats})
        })
        .catch(err => console.log(err))
    }
    
    toggleTable = () => {
        this.setState({showSkips: !this.state.showSkips})
    }

    sortCUs = (arrayOfCUs) => {
        return [...arrayOfCUs].sort((a, b) => a.cuname > b.cuname ? 1 : -1)
    }

    render(){
        return (
            <div>
                <h1>Stats for {getMonth()}</h1>

                <div className="admin-stats-toggle">
                    <button onClick={() => this.toggleTable()} className="ui button">
                        {this.state.showSkips ? "Switch to PTP Data" : "Switch to Skip Data" }
                    </button>   
                </div>
                {this.state.showSkips ? (
                    < SkipStatsTable skipStats={this.state.userSkipStats}/>
                ) : (
                    < PTPStatsTable userStats={this.state.userPTPStats}/>
                )}
            </div>
        )
    }
}

export default RegularStats