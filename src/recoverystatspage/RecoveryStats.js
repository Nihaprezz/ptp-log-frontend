import React from "react"
import StatsTable from "./components/StatsTable"
import FilterByMonth from "./components/FilterByMonth"
import CUCStatsTable from "./components/CUCStatsTable"
import Swal from "sweetalert2"

const backend_url = process.env.REACT_APP_BACKEND

class RecoveryStatsPage extends React.Component {
    constructor(){
        super();

        this.state = {
            month: 0,
            cuStats: [], 
            cucStats: []
        }
    }

    componentDidMount(){
        const d = new Date();
        let newMonth = d.getMonth()+1

        this.getMonthStats( newMonth )
        this.setState({month: newMonth})
    }

    handleMonthChange = (e) => {
        let monthNum = parseInt(e.currentTarget.value)
        this.setState({month: monthNum + 1})
    }

    getMonthStats = (month) => {
        Swal.showLoading()
        fetch(backend_url + `/stats/repo_stats/${month}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(stats => {
            Swal.close();
            this.setState({cuStats: stats.cuStats, cucStats: stats.cucStats})
        })
        .catch(err => alert(err))
    }

    handleSearch = (e) => {
        e.preventDefault();

        this.getMonthStats(this.state.month)
    }

    render(){
        return (
            <div>
                <div style={{width: '95%', margin: 'auto'}}>
                    <h2 className="ui dividing header">Recovery Stats Per Month</h2>
                </div>

                <FilterByMonth month={this.state.month} 
                handleMonthChange={this.handleMonthChange}
                handleSearch={this.handleSearch}/>

                < CUCStatsTable cucStats={this.state.cucStats}/>    

                <StatsTable cuStats={this.state.cuStats}/>
            </div>
        )
    }
}

export default RecoveryStatsPage;