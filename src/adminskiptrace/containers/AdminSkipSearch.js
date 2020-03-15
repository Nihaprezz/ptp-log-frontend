import React from "react";
import SkipSearchBar from "../components/SkipSearchBar"
import SkipSearchResults from "../components/SkipSearchResults"
import SkipReassignForm from "../components/SkipReassignForm"
import Swal from "sweetalert2"
import "../adminskips.css"

const backend_url = `http://localhost:3001/`

class AdminSkipSearch extends React.Component {
    constructor(){
        super();

        this.state = {
            startDate: "", 
            endDate: "", 
            showClosed: false,
            skipRecords: [], 
            allUsers: [], 
            selectAll: false,
            selectedSkips: [], 
            selectedUser: ""
        }
    }

    componentDidMount(){
        fetch(backend_url + 'users', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(users => this.setState({allUsers: users.map(user => user.username)}))
        .catch(err => alert(err))
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let { startDate, endDate, showClosed } = this.state

        if(startDate === "" || endDate === ""){
            Swal.fire('Invalid!', 'Please make sure all fields are filled.', 'warning')
        } else {
            fetch(backend_url + `skips/search/${startDate}/${endDate}/${showClosed}`, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(skips => {
                if(skips.error){
                    Swal.fire("Error", 'Unable to find skip records.', 'info')
                } else {
                    this.setState({skipRecords: skips})
                }
            })
            .catch(err => alert(err))
        }
    }

    handleShowClosed = (e) => {
        this.setState({showClosed: e.currentTarget.checked})
    }

    handleCheckbox = (e, id) => {
        if (e.currentTarget.checked) {
            this.setState({selectedSkips: [...this.state.selectedSkips, id]})
        } else {
            let removed = [...this.state.selectedSkips].filter(skip =>  skip !== id)
            this.setState({selectedSkips: removed})
        }
    }

    handleSelectAll = (e) => {
        this.setState({selectAll: e.currentTarget.checked})
    }

    selectedUser = (e) => {
        this.setState({selectedUser: e.target.value})
    }

    handleUpdate = (e) => {
        e.preventDefault();

        let recordsToChange = [];

        if(this.state.selectAll){
            recordsToChange = [...this.state.skipRecords].map(record => record.id)
        } else {
            recordsToChange = this.state.selectedSkips
        }

        if(recordsToChange.length === 0 ){
            Swal.fire('Cannot Submit', 'Please select at least 1 skip.', 'warning')
        } else {
            fetch(backend_url + 'skips/update_batch/1', {
                method: "PATCH",
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }, 
                body: JSON.stringify({
                    skipIds: recordsToChange, 
                    selectedUser: this.state.selectedUser
                })
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.error){
                    Swal.fire('Error', `${data.error}`, 'error')
                } else {
                    Swal.fire('Success', `${data.message}`, 'success')
                    this.setState({skipRecords: [], selectedSkips: []})
                }
            })
            .catch(err => console.log(err))
        }
    }

    deleteRecords = (e) => {
        e.preventDefault();
        
        let recordsToDelete = [];

        if(this.state.selectAll){
            recordsToDelete = [...this.state.skipRecords].map(record => record.id)
        } else {
            recordsToDelete = this.state.selectedSkips
        }
        
        fetch(backend_url + 'skips/delete_batch/1', {
            method: 'DELETE', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, 
            body: JSON.stringify({
                skipIds: recordsToDelete
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.error){
                Swal.fire('Error', `${data.error}`, 'error')
            } else {
                Swal.fire('Success', `${data.message}`, 'success')
                this.setState({skipRecords: [], selectedSkips: []})
            }
        })
        .catch(err => console.log(err))
    }
    
    render(){
        return (
            <div>
                < SkipSearchBar handleChange={this.handleChange} 
                handleSubmit={this.handleSubmit}
                handleShowClosed={this.handleShowClosed} />

                <div className="skip-results-and-form">
                    < SkipSearchResults 
                    skipRecords={this.state.skipRecords}
                    handleSelectAll={this.handleSelectAll}
                    handleCheckbox={this.handleCheckbox}/>

                    < SkipReassignForm 
                    allUsers={this.state.allUsers} 
                    skipRecords={this.state.skipRecords.length}
                    selectedSkips={this.state.selectedSkips.length}
                    selectAll={this.state.selectAll}
                    selectedUser={this.selectedUser}
                    handleUpdate={this.handleUpdate}
                    deleteRecords={this.deleteRecords}/>   
                </div>
                
            </div>
        )
    }
}

export default AdminSkipSearch;