import React from "react";
import StatsRecord from "../regularstats/StatsRecord"  //Re-using component from regular stats

const backend_url =`http://localhost:3001/`

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
            this.setState({monthStats: data})
        })
        .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
                <h2>Admin Stats Page</h2>

                <form>
                    <label>Month</label>
                    <select></select>
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