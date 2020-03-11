import React from "react";
import SkipTraceTable from "./SkipTraceTable"
import NewSkip from "../forms/NewSkip"
import Swal from "sweetalert2"
import { encryptSSN, decipherSSN } from "../utils/index"

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
    
    componentDidMount(){
        this.fetchSkips()
    }

    handleSkipChange = (type) => {
        this.setState({newSkip: false, skipType: type})
    }

    toggleForm = () => {
        this.setState({newSkip: !this.state.newSkip})
    }

    submitSkip = (info) => {
        let { creditUnion, accountNo, firstName, lastName, ssn } = info
        
        let encryptedSSN = encryptSSN(ssn)
        
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
                ssn: encryptedSSN
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.id){
                debugger
                Swal.fire('Success', 'Skip has been added!', 'success')
            } else {
                Swal.fire('Error', `${data.error}`, 'error')
            }
        })
        .catch(err => alert(err))
    }

    fetchSkips = () => {
        fetch(backend_url + 'skips/1', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(skipData => {
            this.setState({skipData: skipData[0]})
            console.log(decipherSSN(skipData[0].ssn))
        })
    }
    
    render(){
        console.log(this.state)
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