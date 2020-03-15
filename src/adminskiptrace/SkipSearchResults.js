import React from "react"
import SkipSearchRecords from "./SkipSearchRecords"

const SkipSearchResult = (props) => {
    return (
        <div className="ui segment">
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Credit Union</th>
                        <th>Member Name</th>
                        <th>Found User</th>
                        <th>Date Submitted</th>
                        <th>
                            <label className="select-all">Select All</label>
                            <input onChange={(e) => props.handleSelectAll(e)}
                            className="select-all-chbox" type="checkbox"></input>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {props.skipRecords.length !== 0 ? (
                    props.skipRecords.map(skip => {
                        return < SkipSearchRecords key={skip.id} skipObj={skip} 
                        handleCheckbox={props.handleCheckbox}/>
                    })
                ): null}
                </tbody>
            </table>  
        </div>
    )
}

export default SkipSearchResult