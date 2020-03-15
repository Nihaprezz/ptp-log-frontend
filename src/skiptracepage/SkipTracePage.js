import React from "react";
import SkipTraceTable from "./SkipTraceTable"
import { Link, withRouter } from "react-router-dom"
import NewSkip from "../forms/NewSkip"
import Swal from "sweetalert2"
import { encryptSSN } from "../utils/index"
import "./skiptrace.css"


const backend_url = `http://localhost:3001/`

class SkipTracePage extends React.Component {
    constructor(){
        super();

        this.state = {
            newSkip: false, 
            skipType: "pending", 
            skipData: [], 
        }
    }

    componentDidMount(){
        if(this.props.location.state === 'returned'){
            this.setState({skipType: 'returned'}, () => this.fetchSkips('returned'))
        } else {
            this.fetchSkips('pending')
        }
    }

    handleSkipChange = (type) => {
        this.setState({newSkip: false, skipType: type}, () => this.fetchSkips(type))
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
                Swal.fire('Success', 'Skip has been added!', 'success')
                this.setState({skipData: [...this.state.skipData, data]})
            } else {
                Swal.fire('Error', `${data.error}`, 'error')
            }
        })
        .catch(err => alert(err))
    }

    fetchSkips = (type) => {
        let custom_url = `skips/user_${type}/${this.props.user.id}`

        fetch(backend_url + custom_url, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(skipData => {
            this.setState({skipData: skipData})
        })
        .catch(err => console.log(err))
    }
    
    render(){
        return (
            <div>

                <button className="ui green button" onClick={() => this.toggleForm()}>Add New</button>
                <button className="ui button" onClick={() => this.handleSkipChange('pending')}>Pending Skips</button>
                <button className="ui button" onClick={() => this.handleSkipChange('returned')}>Returned Skips</button>
                {this.props.user.isadmin ? <Link className="ui black button" to="/skip_manager">To Skip Manager</Link> : null}

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

export default withRouter(SkipTracePage);