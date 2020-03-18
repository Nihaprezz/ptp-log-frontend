import React from "react";
import StatsRecord from "../regularstats/StatsRecord"  //Re-using component from regular stats
import { monthNames } from "../utils/index"

const backend_url =process.env.REACT_APP_BACKEND

class AdminStatsPage extends React.Component {
    constructor(){
        super();

        this.state = {
            monthStats: [],
            selectedMonth: 0
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
            let sorted = [...data].sort((a, b) => a.name > b.name ? 1 : -1)
            this.setState({monthStats: sorted})
        })
        .catch(err => console.log(err))
    }
    
    handleMonthChange = (e) => {
        let monthNum = parseInt(e.currentTarget.value)
        this.setState({selectedMonth: monthNum + 1})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.getMonthStats(this.state.selectedMonth)
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

                <table className="ui celled table stats-table">
                    <thead>
                        <tr>
                            <th>Credit Union</th>
                            <th>Total PTP's Taken</th>
                            <th>Total Closed PTPs</th>
                            <th>Total Amount Promised</th>
                            <th>Total Amount Collected</th>
                            <th>Percentage of Amount Collected</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.monthStats.length === 0 ? <tr><td>Loading...</td></tr> : (
                            this.state.monthStats.map(data => {
                                return < StatsRecord key={data.cuname} dataObj={data} />
                            })
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdminStatsPage