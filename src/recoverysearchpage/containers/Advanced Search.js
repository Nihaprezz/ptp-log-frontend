import React from "react"
import AdvancedSearchForm from "../components/AdvancedSearchForm"
import AdvancedSearchResults from "../components/AdvancedSearchResults"

class AdvancedSearch extends React.Component {
    render(){
        return (
            <div>
                <h2>Search by Dates</h2>
                <AdvancedSearchForm/>
                <AdvancedSearchResults/>
            </div>
        )
    }
}

export default AdvancedSearch; 