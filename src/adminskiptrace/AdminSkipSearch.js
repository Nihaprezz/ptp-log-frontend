import React from "react";
import SkipSearchBar from "./SkipSearchBar"
import SkipSearchResults from "./SkipSearchResults"
import SkipReassignForm from "./SkipReassignForm"
import Swal from "sweetalert2"
import "./adminskips.css"

const backend_url = `http://localhost:3001/`

class AdminSkipSearch extends React.Component {
    constructor(){
        super();

        this.state = {
            startDate: "", 
            endDate: "", 
            showClosed: false,
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

    handleCheckbox = (e) => {
        this.setState({showClosed: e.currentTarget.checked})
    }

    render(){
        return (
            <div>
                < SkipSearchBar handleChange={this.handleChange} handleSubmit={this.handleSubmit}
                handleCheckbox={this.handleCheckbox}/>

                <div className="skip-results-and-form">
                    < SkipSearchResults skipRecords={this.state.skipRecords}/>

                    < SkipReassignForm />   
                </div>
                
            </div>
        )
    }
}

export default AdminSkipSearch;