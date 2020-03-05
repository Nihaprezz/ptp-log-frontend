import React from "react";

//Filter Bar for PTP Manager
const FilterBar = (props) => {
    console.log(props)
    return (
        <div className="ptp-manager-filter-bar">

            {props.searchType === "user" ? (
                <div className="field">
                    <label>User</label>

                    <select className="ui fluid dropdown">
                        <option>Sergio</option>
                        <option>Diego</option>
                    </select>
                </div>
            ) : (
                <div className="field">
                    <label>Credit Union</label>

                    <select className="ui fluid dropdown">
                        <option>New CU</option>
                        <option>First  CU</option>
                    </select>
                </div>
            )}

            <div className="field">
                <label>Show Closed</label>
                <select className="ui fluid dropdown">
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </div>

            <div className="field dates">
                <label>Start Date</label>
                <input type="date"/>
            </div>

            <div className="field dates">
                <label>End Date</label>
                <input type="date"/>
            </div>

            <button className="ui primary button">Submit</button>
        </div>
    )
}

export default FilterBar