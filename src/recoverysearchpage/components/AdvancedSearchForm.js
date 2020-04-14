import React from "react";

const AdvancedSearchForm = (props) => {
    return (
        <div className="repo-adv-search-form-cont">
            <form className="ui form">
                <div className="field">
                    <label>Start Date</label>
                    <input type="date" name="startDate" onChange={(e) => props.handleChange(e)}/>
                </div>

                <div className="field">
                    <label>End Date</label>
                    <input type="date" name="endDate" onChange={(e) => props.handleChange(e)}/>
                </div>

                <button onClick={(e) => props.handleSubmit(e)}
                className="ui primary button">Submit</button>
            </form>
        </div>
    )
}

export default AdvancedSearchForm;