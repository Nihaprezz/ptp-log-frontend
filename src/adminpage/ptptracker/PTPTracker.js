import React from "react";
import FilterBar from "./FilterBar"
import PTPResults from "./PTPResults"

const backend_url = `http://localhost:3001/`

class PTPTracker extends React.Component {
    constructor(){
        super();

        this.state = {
            user: "", 
            ptpType: "", 
            showClosed: false, 
            ptpData: [], 
            allUsers: []
        }
    }

    componentDidMount(){
        this.setState({allUsers: this.props.allUsers.map(user => user.username)})
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        if(this.state.user !== "" && this.state.ptpType !== ""){
            const customURL = `promisetopays/${this.state.user}/${this.state.ptpType}/${this.state.showClosed}`
            fetch(backend_url + customURL, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                    "Content-Type": 'application/json',
                    "Accept": 'application/json' 
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.setState({ptpData: data})
            })
          
        } else {
            console.log('Please make sure fields are filled')
        }  
    }

    render(){
        return (
            <div>
                <h1>This is the PTP Tracker</h1>
                < FilterBar allUsers={this.props.allUsers.map(user => user.username)} handleChange={this.handleChange} 
                handleSubmit={this.handleSubmit}/>

                {this.state.ptpData.length !== 0 ? < PTPResults ptpType={this.state.ptpType} ptpData={this.state.ptpData}/> : null}
            </div>
        )
    }
}

export default PTPTracker