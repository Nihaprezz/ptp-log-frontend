import React from "react";
import ClosedRepoRow from "./ClosedRepoRow"

const ClosedRepoTable = (props) => {
    let tableRows;
    if(props.closedRepos.message){
        tableRows = <tr><td>No Closed Vehicles</td></tr>
    } else {
        tableRows = props.closedRepos.map(repo => {
            return < ClosedRepoRow 
            repoObj={repo} key={repo.id}
            isadmin={props.isadmin}
            archiveRepo={props.archiveRepo}/>
        })
    }

    return (
        <div style={{width: '98%', margin: 'auto'}}>
            <div style={{textAlign: 'left'}}>
                <h1 className="ui dividing header">Closed Repossessions</h1>

                {props.showAll ? (
                    <button className="ui secondary button" onClick={() => props.toggleAll(false)}>
                        Show Yours Only
                    </button>
                ):(
                    <button className="ui secondary button" onClick={() => props.toggleAll(true)}>
                        Show All
                    </button>  
                )}
            </div>

            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Acct No</th>
                        <th>Credit Union</th>
                        <th>Member Name</th>
                        <th>Vehicle</th>
                        <th>VIN</th>
                        <th>Repo Company</th>
                        <th>Closed Reason</th>
                        {props.isadmin ? (
                            <th></th>
                        ): null}
                    </tr>
                </thead>
                <tbody>
                    {props.closedRepos.length === 0 ? <tr><td>Loading...</td></tr> : (
                        tableRows
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ClosedRepoTable;