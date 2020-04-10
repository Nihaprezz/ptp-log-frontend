import React from "react"
import StatsTable from "./components/StatsTable"
import FilterByMonth from "./components/FilterByMonth"
import { getMonth } from "../utils/index"

class RecoveryStatsPage extends React.Component {
    constructor(){
        super();

        this.state = {
            month: 0,
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
        
    }

    render(){
        return (
            <div>
                {/* {getMonth()} */}
                <div style={{width: '95%', margin: 'auto'}}>
                    <h2 className="ui dividing header">Recovery Stats for {getMonth()}</h2>
                </div>

                <FilterByMonth month={this.state.month} 
                handleMonthChange={this.handleMonthChange}/>

                <StatsTable/>
            </div>
        )
    }
}

export default RecoveryStatsPage;