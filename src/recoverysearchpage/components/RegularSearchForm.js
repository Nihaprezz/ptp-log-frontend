import React from "react";

const RegularSearchForm = (props) => {

    return (
        <div className="regular-search-form">
            <form className="ui form">
                <div className="fields">
                    <div className="twelve wide field">
                        <label>Enter Search Text</label>
                        <input onChange={(e) => props.handleChange(e)}
                        placeholder="Enter Search Term.." name="searchText"/>
                    </div>

                    <div className="four wide field">
                        <label>Choose Search Type</label>
                        <select onChange={(e) => props.handleChange(e)}
                        className="ui fluid dropdown" name="searchType">
                            <option value="vin">VIN</option>
                            <option value="member_name">Member Name</option>
                            <option value="acct_no">Acct No</option>
                        </select>
                    </div>

                    <div className="two wide field" style={{paddingTop: '3vh'}}>
                        <button className="ui primary button" onClick={(e) => props.handleSubmit(e)}>Search</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegularSearchForm;