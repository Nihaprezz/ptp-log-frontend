import React from "react";

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
            comments: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        console.log("attempting to submit new PTP", this.state)

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
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" placeholder="Credit Union" name="creditUnion" value={this.state.creditUnion}/>
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

                    <div className="field">
                        <label>Comments</label>
                        <textarea onChange={(e) => this.handleChange(e)}
                        name="comments" placeholder="PTP Comments" value={this.state.comments}></textarea>
                    </div>
           
                    <div className="ui button" tabIndex="0" onClick={this.handleSubmit}>Submit Order</div>
                </form>
            </div>
        )
    }
}

export default NewPtp