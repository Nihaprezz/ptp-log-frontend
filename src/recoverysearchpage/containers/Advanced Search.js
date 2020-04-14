import React from "react"
import AdvancedSearchForm from "../components/AdvancedSearchForm"
import AdvancedSearchResults from "../components/AdvancedSearchResults"

class AdvancedSearch extends React.Component {
    constructor(){
        super();

        this.state = {
            startDate: "", 
            endDate: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitting the following info: ', this.state)
    }

    render(){
        return (
            <div>
                <h2>Search by Dates</h2>
                <AdvancedSearchForm 
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}/>

                <AdvancedSearchResults/>
            </div>
        )
    }
}

export default AdvancedSearch; 