import React from "react";

//Filter Bar for PTP Manager
const FilterBar = (props) => {
    return (
        <div className="ptp-manager-filter-bar">

            {props.searchType === "user" ? (
                <div className="field">
                    <label>User</label>

                    <select className="ui fluid dropdown" name="user" onChange={(e) => props.handleChange(e)}>
                        <option value="">Choose User</option>>
                        <option value="all">All Users</option>
                        {props.allUsers.map(user => {
                            return <option key={user} value={user}> {user} </option>
                        })}
                    </select>
                </div>
            ) : (
                <div className="field">
                    <label>Credit Union</label>

                    <select className="ui fluid dropdown" name="creditunion" onChange={(e) => props.handleChange(e)}>
                        <option value="">Choose CU</option>
                        {props.allCUs.map(cu => {
                            return <option key={cu} value={cu}> {cu} </option>
                        })}
                    </select>
                </div>
            )}

            <div className="field">
                <label>Show Closed</label>
                <select className="ui fluid dropdown" name="showClosed" onChange={(e) => props.handleChange(e)}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
            </div>

            <div className="field dates">
                <label>Start Date</label>
                <input type="date" name="startDate" onChange={(e) => props.handleChange(e)}/>
            </div>

            <div className="field dates">
                <label>End Date</label>
                <input type="date" name="endDate" onChange={(e) => props.handleChange(e)}/>
            </div>

            <button className="ui primary button" onClick={() =>  props.submitPTPSearch()}>Submit</button>
        </div>
    )
}

export default FilterBar