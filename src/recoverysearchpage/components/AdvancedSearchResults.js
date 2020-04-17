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

    let amtVehsOut, amtVehsRepod;
    if(!props.results.message && props.results.length !== 0){
        amtVehsOut = props.results.length;
        amtVehsRepod = props.results.filter(record => record.repod).length
    } else {
        amtVehsOut = 0
        amtVehsRepod = 0
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
                    <tbody id="repo-adv-results-body">
                        {props.results === 0 ? null : tableRows}
                    </tbody>
                </table>
            </div>

            <div style={{textAlign:'right', paddingTop: '1%', width: '98%', margin: 'auto'}}>
                {props.results.length !== 0 ? (
                    <React.Fragment>
                        <div className="adv-search-selected-box"> Amount of Vehicles Placed Out: {`${amtVehsOut}`}</div>
                        <div className="adv-search-selected-box"> Amount of Vehicles Repo'd: {`${amtVehsRepod}`}</div>
                    </React.Fragment>
                ): null}

                {props.selectAll ? (
                    <div className="adv-search-selected-box">{props.results.length} Records Selected (ALL) </div>
                ):(
                    <div className="adv-search-selected-box">{props.selectedRecords.length} Records Selected</div>
                )}

                <button className="ui red button" onClick={(e) => props.submitDelete(e)}>Delete</button>
            </div>
        </div>
    )
}

export default AdvancedSearchResults;