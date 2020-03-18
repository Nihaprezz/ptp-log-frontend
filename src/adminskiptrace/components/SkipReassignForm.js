import React from "react";

const SkipReassignForm = (props) => {
    
    return (
        <div>
            <h3>Re-assign Skip Records</h3>

            {props.selectAll ? (
                <h4>{props.skipRecords} Skips Selected (ALL)</h4>
            ) : (
                <h4>{props.selectedSkips} Skips Selected</h4>
            )}

            <form className="ui form">
                <div>
                    <label>User</label>
                    <select className="ui fluid dropdown" onChange={(e) => props.selectedUser(e)}>
                        <option value="">Choose User</option>
                        {props.allUsers.map(user => {
                            return <option key={user}>{user}</option>
                        })}
                    </select>
                </div>
            
                <br></br>
                <button className="ui primary button" onClick={(e) =>  props.handleUpdate(e)}>Submit</button>
            </form>
            
            <div className="ui horizontal divider">OR</div>
            <h3>Delete Skip Records</h3>
            <button className="ui red button" onClick={(e) =>  props.deleteRecords(e)} >Delete PTP's</button>
        </div>  
    )
}

export default SkipReassignForm