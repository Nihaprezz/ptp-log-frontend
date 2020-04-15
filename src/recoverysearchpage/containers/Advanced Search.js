import React from "react"
import AdvancedSearchForm from "../components/AdvancedSearchForm"
import AdvancedSearchResults from "../components/AdvancedSearchResults"
import Swal from "sweetalert2"

const backend_url = process.env.REACT_APP_BACKEND

class AdvancedSearch extends React.Component {
    constructor(){
        super();

        this.state = {
            startDate: "", 
            endDate: "", 
            selectedCU: "", 
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
        let {startDate, endDate, selectedCU } = this.state
        
        Swal.showLoading();
        fetch(backend_url + 'repo_orders/search_by_date', {
            method: 'POST', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, 
            body: JSON.stringify({
                startDate, endDate, selectedCU
            })
        })
        .then(resp => resp.json())
        .then(searchResults => {
            Swal.close();
            if(searchResults.error){
                this.setState({results: {message: 'No Results Found'}})
            } else {
                this.setState({results: searchResults})
            }
        })
        .catch(err => console.log(err)) 
    }

    render(){
        return (
            <div>
                <h2>Search by Dates</h2>

                <AdvancedSearchForm 
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                allCUs={this.props.allCUs}/>

                <AdvancedSearchResults 
                results={this.state.results}/>
            </div>
        )
    }
}

export default AdvancedSearch; 