import React from "react";

const FilterBar = (props) => {

    return (
        <div className="filter-bar-container">
            <div className="field">
                <label>User</label>
                <select onChange={(e) => props.handleChange(e)}
                name="user" className="ui fluid dropdown">
                    <option value="">Select User</option>
                    {props.allUsers.map(user => {
                        return <option key={user} value={user}>{user}</option>
                    })}
                </select>
            </div>

            <div className="field">
                <label>PTP Type</label>
                <select onChange={(e) => props.handleChange(e)}
                className="ui fluid dropdown" name="ptpType">
                    <option value="">Select PTP Type</option>
                    <option value="daybefore">Day Before</option>
                    <option value="dayafter">Day After</option>
                    <option value="otptransers">OTP/Transfers</option>
                </select>
            </div>

            <div className="field">
                <label>Show Closed PTPs</label>
                <select onChange={(e) => props.handleChange(e)}
                name="showClosed" className="ui fluid dropdown" defaultValue={false}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
            </div>

            <button className="ui button" onClick={() => props.handleSubmit()}>Get PTP Data</button>
        </div>
    )
}

export default FilterBar;