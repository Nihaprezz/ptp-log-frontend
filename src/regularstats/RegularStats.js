import React from "react";
import StatsRecord from "./StatsRecord"
import "./regularstats.css"
import { getMonth } from "../utils/index"

const backend_url = process.env.REACT_APP_BACKEND

class RegularStats extends React.Component {
    constructor(){
        super()

        this.state = {
            userStats: [],
            
        }
    }

    componentDidMount(){
        fetch(backend_url + `stats/${this.props.user.id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({userStats: data})
        })
        .catch(err => console.log(err))
    }
    
    render(){
        return (
            <div>
                <h1>Stats for {getMonth()}</h1>

                

                <table className="ui celled table stats-table">
                    <thead>
                    <tr>
                        <th>Credit Union</th>
                        <th>Total PTP's Taken</th>
                        <th>Total Closed PTPs</th>
                        <th>Total Amount Promise</th>
                        <th>Total Amount Collected</th>
                        <th>Percentage of Amount Collected</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.userStats.length === 0 ? <tr><td>Loading...</td></tr> : (
                            this.state.userStats.map(data => {
                                return < StatsRecord key={data.cuname} dataObj={data} />
                            })
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default RegularStats