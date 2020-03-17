import React from "react";
import Swal from "sweetalert2"
import { validatePTP } from "../utils/index" 

const backend_url = process.env.REACT_APP_BACKEND

class NewPtp extends React.Component {
    constructor(){
        super();

        this.state = {
            accountNo: "",
            creditUnion: "",
            firstName: "",
            lastName:"",
            ptpAmt: "",
            ptpDate: "",
            comments: "",
            allCreditUnions: []
        }
    }

    componentDidMount(){
        this.setState({allCreditUnions: this.props.allCUs.map(cu =>  cu.name),
             creditUnion: this.props.allCUs[0].name})
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        if(validatePTP(this.state.accountNo, this.state.firstName, this.state.lastName, this.state.ptpAmt, this.state.ptpDate)) {
            Swal.fire('Invalid', 'Make sure all fields are filled in.', 'info')
        } else {
            fetch(backend_url + '/promisetopays', {
                method: "POST", 
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }, 
                body: JSON.stringify({
                    newPTP: this.state
                })
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.id){
                    Swal.fire('Done', 'PTP Added!', 'success')
                } else {
                    Swal.fire('Error', 'Unable to create PTP. Try Again?', 'error')
                }
            })
            .catch(err => Swal.fire('Error', `Unable to create PTP : ${err}. Try Again?`, 'error'))
        }

        this.setState({
            accountNo: "", creditUnion: "", firstName: "", lastName: "", ptpAmt: "", ptpDate: "", comments: ""
        })
    }

    render(){
        return (
            <div className="form-container">
                <form className="ui form">
                    <h4 className="ui dividing header">Enter PTP Info</h4>
                    <div className="two fields">
                        <div className="field">
                            <label>Account Number</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" placeholder="Account Number" name="accountNo" value={this.state.accountNo}/>
                        </div>

                        <div className="field">
                            <label>Credit Union</label>
                            <select onChange={(e) => this.handleChange(e)}
                            className="ui fluid dropdown" name="creditUnion" value={this.state.creditUnion}>
                                {this.state.allCreditUnions.map((cu, index)=> {
                                    return <option key={index} value={cu}>{cu}</option>
                                })}
                            </select>

                            
                        </div>
                    </div>

                    <div className="two fields">
                        <div className="field">
                            <label>First Name</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" placeholder="First Name" name="firstName" value={this.state.firstName} required/>
                        </div>

                        <div className="field">
                            <label>Last Name</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" placeholder="Last Name" name="lastName" value={this.state.lastName} required/>
                        </div>
                    </div>


                    <div className="two fields">
                        <div className="field">
                            <label>PTP Amount</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="number" step="0.01" placeholder="PTP Amount $" name="ptpAmt" value={this.state.ptpAmt} required/>
                        </div>

                        <div className="field">
                            <label>PTP Date</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="date" placeholder="PTP Date" name="ptpDate" value={this.state.ptpDate} required/>
                        </div>
                    </div>

                    <div className="field">
                        <label>Comments</label>
                        <textarea onChange={(e) => this.handleChange(e)}
                        name="comments" placeholder="PTP Comments" value={this.state.comments}></textarea>
                    </div>
           
                    <div className="ui button primary" tabIndex="0" onClick={this.handleSubmit}>Submit PTP</div>
                </form>
            </div>
        )
    }
}

export default NewPtp