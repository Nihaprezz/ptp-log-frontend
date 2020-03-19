import React from "react";
import PTPAdminTable from "./PTPAdminTable"
import AdminSkipTable from "./AdminSkipTable"
import { monthNames } from "../utils/index"

const backend_url =process.env.REACT_APP_BACKEND

class AdminStatsPage extends React.Component {
    constructor(){
        super();

        this.state = {
            monthPTPStats: [],
            monthSkipStats: [],
            selectedMonth: 0, 
            showSkips: false
        }
    }

    componentDidMount(){
        const d = new Date();
        let month = d.getMonth()+1

        this.getMonthStats( month )
        this.setState({selectedMonth: month })
    }

    getMonthStats = (month) => {
        fetch(backend_url + `stats/admin/${month}`)
        .then(resp => resp.json())
        .then(data => {
            let sortedSkips = this.sortCUs(data.skipStats)
            let sortedPtps = this.sortCUs(data.ptpStats)
            this.setState({monthPTPStats: sortedPtps, monthSkipStats: sortedSkips})
        })
        .catch(err => alert(err))
    }
    
    handleMonthChange = (e) => {
        let monthNum = parseInt(e.currentTarget.value)
        this.setState({selectedMonth: monthNum + 1})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.getMonthStats(this.state.selectedMonth)
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
                <h2>Admin Stats Page</h2>

                <form className="ui form month-select-container">
                    <div className="field month-field">
                        <label>Month</label>

                        <select className="ui fluid dropdown" value={this.state.selectedMonth - 1}
                        onChange={(e) => this.handleMonthChange(e)}>

                            {monthNames.map((month, index)=> {
                                return <option key={index} value={index}>{month}</option>
                            })}

                        </select>
                    </div>

                    <button className="ui primary button" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                </form>
                
                <div className="admin-stats-toggle">
                    <button onClick={() => this.toggleTable()} className="ui button">
                        {this.state.showSkips ? "Switch to PTP Data" : "Switch to Skip Data" }
                    </button>   
                </div>


                {this.state.showSkips ? (
                    < AdminSkipTable skipStats={this.state.monthSkipStats}/> 
                ): (
                   < PTPAdminTable monthStats={this.state.monthPTPStats}/>  
                )}     
            </div>
        )
    }
}

export default AdminStatsPage