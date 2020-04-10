import React from "react";
import { monthNames } from "../../utils/index"

const FilterByMonth = (props) => {
    return (
        <form className="ui form" style={{width: "50%", margin: "auto", paddingTop: '1%', paddingBottom: '1%'}}>
            <div className="field">
                <label style={{fontSize: '2vh'}}>Month</label>

                <select className="ui fluid dropdown" value={props.month - 1}
                    onChange={(e) => props.handleMonthChange(e)}>

                    {monthNames.map((month, index)=> {
                        return <option key={index} value={index}>{month}</option>
                    })}
                </select>
            </div>

            <button onClick={(e) => props.handleSearch(e)}
            className="ui secondary button">Submit</button>
        </form>
    )
}

export default FilterByMonth;