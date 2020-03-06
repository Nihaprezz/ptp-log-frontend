import React from "react"

const ReassignForm = (props) => {
    return (
        <div className="ui segment re-assgin-form-container">
            <h3>Re-Assign PTPs</h3>
            <form className="ui form reassign-form">
                <div>
                    <label>User</label>
                    <select className="ui fluid dropdown">
                        <option>User</option>
                    </select>
                </div>
            </form>

            <button className="ui button"> Submit </button>

            <div className="ui horizontal divider">OR</div>

            <button className="ui red button">Delete PTP's</button>
        </div>
    )
}

export default ReassignForm;