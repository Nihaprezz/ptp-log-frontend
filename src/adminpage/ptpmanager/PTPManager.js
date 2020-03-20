import React from "react";
import FilterBar from "./FilterBar"
import PTPRecordsContainer from "./PTPRecordsContainer"
import ReassignForm from "./ReassignForm"
import Swal from "sweetalert2"

const backend_url = process.env.REACT_APP_BACKEND

class PTPManager extends React.Component {
    constructor(){
        super();

        this.state = {
            searchType: "user", 
            user: "", 
            showClosed: false, 
            creditunion: "",
            startDate: "", 
            endDate: "",
            searchResults: [], 
            selectedAll: false,
            selectedPTPs: [],
            userToReassign: ""
        }
    }

    changeSearchType = (type) => {
        this.setState({searchType: type})
    }

    updateSearchParams = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitPTPSearch = () => {
        let {searchType, user, showClosed, creditunion, startDate, endDate} = this.state
        let endpoint = "";

        if(searchType === "user"){
            endpoint = `promisetopays/user/${user}/${showClosed}/${startDate}/${endDate}`

            user === "" ? Swal.fire('Warning', 'Make sure all fields are filled', 'warning') : this.fetchData(endpoint)
        } else {
            endpoint = `promisetopays/creditunon/${creditunion}/${showClosed}/${startDate}/${endDate}`

            creditunion === "" ? Swal.fire('Warning', 'Make sure all fields are filled', 'warning') : (
                this.fetchData(endpoint) )
        }
    }

    fetchData = (endpoint) => {
        fetch(backend_url + endpoint, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({searchResults: data})
        })
        .catch(err => alert(err))
    }

    handleCheckbox = (e, id) => {
        if (e.currentTarget.checked) {
            this.setState({selectedPTPs: [...this.state.selectedPTPs, id]})
        } else {
            let removed = [...this.state.selectedPTPs].filter(ptp =>  ptp !== id)
            this.setState({selectedPTPs: removed})
        }
    }

    handleSelectAll = (e) => {
        this.setState({selectedAll: e.currentTarget.checked})
    }

    handleUserChange = (e) => {
        this.setState({userToReassign: e.currentTarget.value})
    }
    
    handleUpdate = () => {
        // Loader will show
        Swal.showLoading();

        let recordsToChange = [];

        if(this.state.selectedAll){
            recordsToChange = [...this.state.searchResults].map(record => record.id)
        } else {
            recordsToChange = this.state.selectedPTPs
        }


        fetch(backend_url + 'promisetopays/update_batch/1', {
            method: "PATCH",
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, 
            body: JSON.stringify({
                ptpIds: recordsToChange, 
                selectedUser: this.state.userToReassign
            })
        })
        .then(resp => resp.json())
        .then(data => {
            // Close loader once response comes back
            Swal.close();
            
            if(data.error){
                Swal.fire('Error', `${data.error}`, 'error')
            } else {
                Swal.fire('Success', `${data.message}`, 'success')
                this.setState({searchResults: [], selectedPTPs: []})
            }
        })
        .catch(err => console.log(err))
    }

    handleDelete = () => {
        let recordsToDelete = [];

        if(this.state.selectedAll){
            recordsToDelete = [...this.state.searchResults].map(record =>  record.id)
        } else {
            recordsToDelete = this.state.selectedPTPs
        }
        
        fetch(backend_url + 'promisetopays/delete_batch/1', {
            method: 'DELETE', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, 
            body: JSON.stringify({
                ptpIds: recordsToDelete
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.error){
                Swal.fire('Error', `${data.error}`, 'error')
            } else {
                Swal.fire('Success', `${data.message}`, 'success')
                this.setState({searchResults: [], selectedPTPs: []})
            }
        })
        .catch(err => console.log(err))
    }

    handleSortBy = (type) => {
        if (type === 'user'){
            let sortedByUser = [...this.state.searchResults].sort((a, b) => {
                return a.user.username.toLowerCase() > b.user.username.toLowerCase() ? 1 : -1
            })

            this.setState({searchResults: sortedByUser})
        } else if (type === 'cu') {
            let sortByCu = [...this.state.searchResults].sort((a, b) => {
                return  a.creditunion.name.toLowerCase() > b.creditunion.name.toLowerCase() ? 1 : -1
            })
            this.setState({searchResults: sortByCu})
        }
    }

    render(){
        return (
            <div>
                <br></br>
                <h3>Search By: </h3>
                <div id="search-by-bar" className="ui two item menu">
                    {/* eslint-disable-next-line*/}
                    <a className="item" onClick={() => this.changeSearchType('user')}>User</a>
                    {/* eslint-disable-next-line*/}
                    <a className="item" onClick={() => this.changeSearchType('creditunion')}>Credit Union</a>
                </div>

                < FilterBar 
                searchType={this.state.searchType} 
                allUsers={this.props.allUsers.map(user => user.username)}
                allCUs={this.props.allCUs.map(cu => cu.name)}
                handleChange={this.updateSearchParams}
                submitPTPSearch={this.submitPTPSearch} />

                <div className="records-form-container container">
                    < PTPRecordsContainer ptpData={this.state.searchResults} 
                    handleSelectAll={this.handleSelectAll} 
                    handleCheckbox={this.handleCheckbox}
                    handleSortBy={this.handleSortBy}/>

                    < ReassignForm 
                    allUsers={this.props.allUsers.map(user => user.username)}
                    selectedPTPs={this.state.selectedPTPs} 
                    selectedAll={this.state.selectedAll}
                    allResults={this.state.searchResults.length} 
                    handleUserChange={this.handleUserChange}
                    handleUpdate={this.handleUpdate}
                    handleDelete={this.handleDelete} />    
                </div>
               
            </div>
        )
    }
}

export default PTPManager