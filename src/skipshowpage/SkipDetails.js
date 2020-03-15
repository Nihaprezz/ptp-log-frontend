import React from "react";

const SkipDetails = (props) => {

    console.log(props)
    let {id, acct_no, first_name, last_name, results } = props.skipObj
    let cuName = props.skipObj.creditunion.name

    const backBtn = () => {
        window.history.back()
    }

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
                        <input type="checkbox"></input>
                    </div>

                    <button className="ui primary button">Done</button>
                    <button className="ui button" onClick={() => backBtn()}>Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default SkipDetails