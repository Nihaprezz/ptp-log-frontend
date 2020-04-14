import React from "react"
import RegularSearchForm from "../components/RegularSearchForm"
import SearchResults from "../components/RegularSearchResults"
import Swal from "sweetalert2"

const backend_url = process.env.REACT_APP_BACKEND

class RegularSearch extends React.Component{
    constructor(){
        super();

        this.state = {
            searchText: "",
            searchType: "vin",
            results: []
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
            Swal.showLoading();

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
                Swal.close();
                if (foundRecords.error){
                    Swal.fire('Invalid Inputs', 'Check Search Text', 'error')
                    this.setState({results: {message:'Error'}})
                } else {
                    this.setState({results: foundRecords})  
                }
            })
            .catch(err => alert(err))
        }
    }

    render(){
        let results = this.state.results.message ? <h2> No Records Found </h2> : (
            this.state.results.map(repo => {
                return <SearchResults key={repo.id} repoObj={repo}/>
            })
        )        

        return (
            <div>
                <div className="regular-search-header">
                    <h1>Search By: </h1>
                    <p>Last six of VIN, Member Name or Account Number</p>
                </div>

                < RegularSearchForm handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}/>

                <div className="regular-results-count-txt">
                    <p>Results: <span>{this.state.results.message ? '0' : this.state.results.length}</span></p>
                </div>
                
                <div className="ui segment regular-results-conts">
                    {this.state.results.length !== 0 ? (
                        results
                    ): null}
                </div>
                
            </div>
        )
    }
}

export default RegularSearch;