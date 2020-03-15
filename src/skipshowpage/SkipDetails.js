import React from "react";
import { Link } from "react-router-dom"

const SkipDetails = (props) => {

    let {id, acct_no, first_name, last_name, results } = props.skipObj
    let cuName = props.skipObj.creditunion.name

    return (
        <div>
            <h1>Skip Details</h1>
            <div className="ui segment skip-container">
                <div className="skip-user-details">
                    <p>Account No: {acct_no}</p>
                    <p>Credit Union: {cuName}</p>
                    <p>Member Name: {`${first_name} ${last_name}`}</p> 
                </div>
           

                <div className="ui form">
                    <div className="field">
                        <label>Results</label>
                        <textarea defaultValue={results} />
                    </div>

                    <div className="field">
                        <label>Found User</label>
                        <input type="checkbox" onChange={(e) =>  props.handleFoundCheck(e)}></input>
                    </div>

                    <button className="ui primary button" onClick={() => props.updateSkip(id)}>Done</button>

                    <Link className="ui button" to={{
                        pathname: '/skip_trace', 
                        state: 'returned'
                    }}>Back to Log</Link>
                </div>

            </div>
        </div>
    )
}

export default SkipDetails