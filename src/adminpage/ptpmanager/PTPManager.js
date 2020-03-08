import React from "react";
import FilterBar from "./FilterBar"
import PTPRecordsContainer from "./PTPRecordsContainer"
import ReassignForm from "./ReassignForm"

const backend_url = `http://localhost:3001/`

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
            selectedAll: false
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
        } else {
            endpoint = `promisetopays/creditunon/${creditunion}/${showClosed}/${startDate}/${endDate}`
        }

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
    }

    handleCheckbox = (e) => {
        console.log('handling checkbox', e.currentTarget.checked)
    }

    handleSelectAll = (e) => {
        console.log('handling the select all', e.currentTarget.checked)
    }

    //handlCheckbox, should take the status of the checked. True or False. along with the id of the record... it will be added or removed from an array depending on what status the check comes in. 

    //handleSelectAll. if the checked is true then the array should switch and will map through this.state.searchResults and turn it into an array of ID's 

    //HTML element on the re-assign form will have the amount of records selected and should be able to toggle between the select all items and also check to see how many records have a checkbox of select all is not checked....

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
                    < PTPRecordsContainer ptpData={this.state.searchResults} handleSelectAll={this.handleSelectAll} 
                    handleCheckbox={this.handleCheckbox}/>

                    < ReassignForm />    
                </div>
               
            </div>
        )
    }
}

export default PTPManager