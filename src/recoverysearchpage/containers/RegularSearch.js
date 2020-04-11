import React from "react"
import RegularSearchForm from "../components/RegularSearchForm"
import Swal from "sweetalert2"

const backend_url = process.env.REACT_APP_BACKEND

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
        let {searchText, searchType} = this.state

        if(searchText === ""){
            Swal.fire('Cannot Search', "Please make sure you enter a search term", 'info')
        } else { 
            let formatSearch =  searchText.trim().toLowerCase()

            fetch(backend_url + 'repo_orders/search_repos', {
                method: 'POST', 
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                },
                body: JSON.stringify({
                    search_text: formatSearch,
                    search_type: searchType
                })
            })
            .then(resp => resp.json())
            .then(foundRecords => {
                
                console.log(foundRecords)
            })
            .catch(err => alert(err))
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