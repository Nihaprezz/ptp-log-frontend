import React from "react"
import RegularSearchForm from "../components/RegularSearchForm"
import Swal from "sweetalert2"

class RegularSearch extends React.Component{
    constructor(){
        super();

        this.state = {
            searchText: "",
            searchType: "vin",
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        if(this.state.searchText === ""){
            Swal.fire('Cannot Search', "Please make sure you enter a search term", 'info')
        } else {
            console.log("submitting the for search" , this.state)  
        }
    }

    render(){
        return (
            <div>
                <div className="regular-search-header">
                    <h1>Search By: </h1>
                    <p>Last six of VIN, Member Name or Account Number</p>
                </div>

                < RegularSearchForm handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default RegularSearch;