import React from "react"
import AdvResultsRow from "./AdvResultsRow"

const AdvancedSearchResults = (props) => {
    let tableRows;
    if(props.results.message){
        tableRows = <tr><td>No Repo Records Found</td></tr>
    } else {
        tableRows = props.results.map(record => {
            return <AdvResultsRow key={record.id} repoObj={record} selectRecord={props.selectRecord}/>
        })
    }

    return (
        <div>
            <div className="ui segment repo-adv-segment-cont">
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Acct No</th>
                            <th>Credit Union</th>
                            <th>Member Name</th>
                            <th>Vehicle</th>
                            <th>VIN</th>
                            <th>Placed Out</th>
                            <th>Repo'd</th>
                            <th>Archived</th>
                            <th>Select All
                                <input style={{marginLeft: '4%'}} onClick={(e) => props.selectedAll(e)} type="checkbox"/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.results === 0 ? null : tableRows}
                    </tbody>
                </table>
            </div>

            <div style={{textAlign:'right', paddingTop: '1%', width: '98%', margin: 'auto'}}>
                {props.selectAll ? (
                    <div>{props.results.length} Records Selected (ALL) </div>
                ):(
                    <div>{props.selectedRecords.length} Records Selected</div>
                )}
                <button className="ui red button">Delete</button>
            </div>
        </div>
    )
}

export default AdvancedSearchResults;