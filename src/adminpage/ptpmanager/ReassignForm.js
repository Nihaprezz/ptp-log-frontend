import React from "react"

const ReassignForm = (props) => {

    return (
        <div className="ui segment re-assgin-form-container">
            <h3>Re-Assign PTPs</h3>
            <div className="ui card selected-ptps-div">
                {props.selectedAll ? <p>{props.allResults} PTPs Selected(All)</p> : <p>{props.selectedPTPs.length} PTPs Selected</p>} 
            </div>
            <form className="ui form reassign-form">
                <div>
                    <label>User</label>
                    <select className="ui fluid dropdown" onChange={(e) => props.handleUserChange(e)}>
                        <option value="">Choose User</option>
                        {props.allUsers.map(user => {
                            return <option key={user}>{user}</option>
                        })}
                    </select>
                </div>
            </form>

            <button className="ui button" onClick={() => props.handleUpdate()}> Submit </button>

            <div className="ui horizontal divider">OR</div>

            <button className="ui red button" onClick={() => props.handleDelete()}>Delete PTP's</button>
        </div>
    )
}

export default ReassignForm;