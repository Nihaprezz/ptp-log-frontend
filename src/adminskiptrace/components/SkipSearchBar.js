import React from "react";

const SkipSearchBar = (props) => {

    return (
        <div className="skip-search-bar">
            <form className="ui form">

                <div className="field">
                    <label>
                        Start Date
                    </label>
                    <input onChange={(e) => props.handleChange(e)}
                    name="startDate" type="date"/>
                </div>

                <div className="field">
                    <label>
                        End Date
                    </label>
                    <input onChange={(e) => props.handleChange(e)}
                    name="endDate" type="date"/>
                </div>

                <div className="field">
                    <label>
                        Show Closed
                    </label>
                    <input onChange={(e) => props.handleShowClosed(e)}
                    type="checkbox" name="showClosed"/>
                </div>


                <button className="ui primary button" onClick={(e) => props.handleSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}

export default SkipSearchBar