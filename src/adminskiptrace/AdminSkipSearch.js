import React from "react";
import SkipSearchBar from "./SkipSearchBar"
import SkipSearchResults from "./SkipSearchResults"
import SkipReassignForm from "./SkipReassignForm"
import "./adminskips.css"

class AdminSkipSearch extends React.Component {
    constructor(){
        super();

        this.state = {
            startDate: "", 
            endDate: "", 
            showClosed: false,
            skipType: "", 
            skipRecords: []
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
    }

    handleCheckbox = (e) => {
        this.setState({showClosed: e.currentTarget.checked})
    }

    render(){
        return (
            <div>
                < SkipSearchBar handleChange={this.handleChange} handleSubmit={this.handleSubmit}
                handleCheckbox={this.handleCheckbox}/>

                <div className="skip-results-and-form">
                    < SkipSearchResults />

                    < SkipReassignForm />   
                </div>
                
            </div>
        )
    }
}

export default AdminSkipSearch;