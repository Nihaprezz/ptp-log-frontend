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
            results: [],
            selectedRecords: [],
            selectAll: false, 
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

    selectRecord = (e, id) => {
        if(e.target.checked){
            let updatedRecords = [...this.state.selectedRecords, id]
            this.setState({selectedRecords: updatedRecords})
        } else {
            let filteredRecords = [...this.state.selectedRecords].filter(record => record !== id)
            this.setState({selectedRecords: filteredRecords})
        }
    }

    selectedAll = (e) => {
        e.target.checked ? this.setState({selectAll: true}) : this.setState({selectAll: false})
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
                results={this.state.results}
                selectRecord={this.selectRecord}
                selectedAll={this.selectedAll}
                selectedRecords={this.state.selectedRecords}
                selectAll={this.state.selectAll}/>
            </div>
        )
    }
}

export default AdvancedSearch; 