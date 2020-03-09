import React from "react"
import { Link } from "react-router-dom";

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
            followedPTP: false, 
            moveOTP: false,
            closed_ptp: "",
            allCreditUnions: []
        }
    }

    componentDidMount(){
        let {acct_no, first_name, last_name, ptp_amt, ptp_date, comments, collected_amt, followed_up, closed_ptp, otp_or_transer } = this.props.ptpObj

        this.setState({
            accountNo: acct_no, 
            creditUnion: this.props.ptpObj.creditunion.name, 
            firstName: first_name, 
            lastName: last_name,
            ptpAmt: ptp_amt, 
            ptpDate: ptp_date, 
            comments: comments,  
            collectedAmt: collected_amt, 
            followedPTP: followed_up, 
            closed_ptp: closed_ptp, 
            moveOTP: otp_or_transer, 
            allCreditUnions: this.props.allCUs.map(cu => cu.name)
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheckbox = (e) => {
        this.setState({
            [e.target.name]: e.currentTarget.checked
        })
    }

    render(){
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

                <div className="four fields">
                    <div className="field">
                        <label>Collected Amt</label>
                        <input onChange={(e) => this.handleChange(e)}
                        type="number" step="0.01" name="collectedAmt" value={this.state.collectedAmt}/>
                    </div>

                    <div className="field">
                        <label>Followed Up</label>
                        <input onChange={(e) => this.handleCheckbox(e)}
                        className="checkbox-style" type="checkbox" name="followedPTP"/>
                    </div>
                    
                    <div className="field">
                        <label>Move to OTP/Transers</label>
                        <input onChange={(e) => this.handleCheckbox(e)}
                         className="checkbox-style" type="checkbox" name="moveOTP"/>
                    </div>
                            
                    <div className="field">
                        <label>Close PTP</label>
                        <input onChange={(e) => this.handleCheckbox(e)}
                        className="checkbox-style" type="checkbox" name="closed_ptp"/>
                    </div>

                </div>

                <div className="field">
                    <label>Comments</label>
                    <textarea onChange={(e) => this.handleChange(e)}
                    name="comments" placeholder="PTP Comments" value={this.state.comments}></textarea>
                </div>
       
                <div className="ui button primary" tabIndex="0" onClick={() => this.props.updatePTP(this.state, this.props.ptpObj.id)}>Update PTP</div>
                <Link className="ui button" to="/">Go Back</Link>

            </form>
        </div>
        )
    }
}

export default PTPEdit