import React from "react";

const backend_url = `http://localhost:3001/`

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
        fetch(backend_url + 'creditunions', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(creditUnions => {
            this.setState({
                allCreditUnions: creditUnions.map(cu => cu.name),
                creditUnion: creditUnions[0].name
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        console.log("attempting to submit new PTP", this.state)

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
            debugger
            console.log(data)
        })
        .catch(err => console.log(err))


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