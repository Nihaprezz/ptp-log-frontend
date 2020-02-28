import React from "react"
import { Link } from "react-router-dom"

class PTPEdit extends React.Component {
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
            collectedAmt: "",
            followedPTP: "",
            activePtp: ""
        }
    }

    componentDidMount(){
        let {acct_no, first_name, last_name, ptp_amt, ptp_date, comments, collected_amt, followed_up, active_ptp } = this.props.ptpObj

        this.setState({
            accountNo: acct_no, creditUnion: this.props.ptpObj.creditunion.name, firstName: first_name, lastName: last_name,
            ptpAmt: ptp_amt, ptpDate: ptp_date, comments: comments,  collectedAmt: collected_amt, followedPTP: followed_up, activePtp: active_ptp
        })
    }

    render(){
        // let {id, acct_no, first_name, last_name, ptp_amt, ptp_date, comments, collected_amt, followed_ptp, active_ptp } = this.props.ptpObj
        //let employees change the CU NAME?

        console.log(this.props)
        return (
            <div className="form-container">
            <form className="ui form">
                <h4 className="ui dividing header">Edit PTP Info</h4>
                <div className="two fields">
                    <div className="field">
                        <label>Account Number</label>
                        <input onChange={(e) => this.handleChange(e)}
                        type="text" placeholder="Account Number" name="accountNo" value={this.state.accountNo}/>
                    </div>

                    <div className="field">
                        <label>Credit Union</label>
                        <input 
                        type="text" placeholder="Account Number" name="accountNo" defaultValue={this.state.creditUnion}/>  
                    </div>
                </div>

                <div className="two fields">
                    <div className="field">
                        <label>First Name</label>
                        <input onChange={(e) => this.handleChange(e)}
                        type="text" placeholder="First Name" name="firstName" value={this.state.firstName}/>
                    </div>

                    <div className="field">
                        <label>Last Name</label>
                        <input onChange={(e) => this.handleChange(e)}
                        type="text" placeholder="Last Name" name="lastName" value={this.state.lastName}/>
                    </div>
                </div>


                <div className="two fields">
                    <div className="field">
                        <label>PTP Amount</label>
                        <input onChange={(e) => this.handleChange(e)}
                        type="number" step="0.01" placeholder="PTP Amount $" name="ptpAmt" value={this.state.ptpAmt}/>
                    </div>

                    <div className="field">
                        <label>PTP Date</label>
                        <input onChange={(e) => this.handleChange(e)}
                        type="date" placeholder="PTP Date" name="ptpDate" value={this.state.ptpDate}/>
                    </div>
                </div>

                <div className="three fields">
                    <div className="field">
                        <label>Collected Amt</label>
                        <input onChange={(e) => this.handleChange(e)}
                        type="number" step="0.01" placeholder="PTP Amount $" name="ptpAmt" value={this.state.collectedAmt}/>
                    </div>

                    <div className="field">
                        <label>Followed Up</label>
                        <input className="" type="checkbox" name="example"/>
                    </div>

                    <div className="field">
                        <label>Close PTP</label>
                        <input className="" type="checkbox" name="example"/>
                    </div>

                </div>

                <div className="field">
                    <label>Comments</label>
                    <textarea onChange={(e) => this.handleChange(e)}
                    name="comments" placeholder="PTP Comments" value={this.state.comments}></textarea>
                </div>
       
                <div className="ui button primary" tabIndex="0" onClick={this.handleSubmit}>Update PTP</div>
                <Link className="ui button" to="/">Go Back</Link>

            </form>
        </div>
        )
    }
}

export default PTPEdit