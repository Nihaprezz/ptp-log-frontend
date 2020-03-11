import React from "react";
import SkipTraceTable from "./SkipTraceTable"
import NewSkip from "../forms/NewSkip"
import Swal from "sweetalert2"

const backend_url = `http://localhost:3001/`

class SkipTracePage extends React.Component {
    constructor(){
        super();

        this.state = {
            newSkip: false, 
            skipType: "pending", 
            skipData: []
        }
    }

    handleSkipChange = (type) => {
        this.setState({newSkip: false, skipType: type})
    }

    toggleForm = () => {
        this.setState({newSkip: !this.state.newSkip})
    }

    submitSkip = (info) => {
        let { creditUnion, accountNo, firstName, lastName, ssn } = info
        
        fetch(backend_url + 'skips/', {
            method: 'POST', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, 
            body: JSON.stringify({
                user: this.props.user.id,
                creditUnion, 
                accountNo, 
                firstName, 
                lastName, 
                ssn
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.id){
                Swal.fire('Success', 'Skip has been added!', 'success')
            } else {
                Swal.fire('Error', `${data.error}`, 'error')
            }
        })
        .catch(err => alert(err))
    }
    
    render(){
        return (
            <div>
                <h1>Skip Trace Page </h1>

                <button className="ui green button" onClick={() => this.toggleForm()}>Add New</button>
                <button className="ui button" onClick={() => this.handleSkipChange('pending')}>Pending Skips</button>
                <button className="ui button" onClick={() => this.handleSkipChange('returned')}>Returned Skips</button>

                {this.state.newSkip ? (
                    < NewSkip 
                    submitSkip={this.submitSkip}
                    toggleForm={this.toggleForm} 
                    allCUs={this.props.allCUs.map(cu => cu.name)}/> 
                ) : (
                    < SkipTraceTable 
                    skipData={this.state.skipData} 
                    skipType={this.state.skipType} />
                )}
            </div>
        )
    }
}

export default SkipTracePage