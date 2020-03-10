import React from "react";

class NewSkip extends React.Component {
    constructor(){
        super();

        this.state = {
            accountNo: false,
            creditUnion: false,
            firstName: false,
            lastName: false,
            ssn: false, 
        }
    }   

    handleChange= (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.submitSkip(this.state)
    }

    render(){
        return (
            <div>
                <form className="ui form form-container">
                    <h3 className="ui dividing header">New Skip</h3>

                    <div className="two fields">
                        <div className="field">
                            <label>Account No</label>
                            <input type="text" placeholder="Account No" name="accountNo"
                            onChange={(e) => this.handleChange(e)}/>
                        </div>

                        <div className="field">
                            <label>Credit Union</label>
                            <select className="ui fluid dropdown" name="creditUnion" onChange={(e) => this.handleChange(e)}>
                                <option value=""> Select Credit Union </option>
                                {this.props.allCUs.map(cu => {
                                    return <option key={cu} value={cu}> {cu} </option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="two fields">
                        <div className="field">
                            <label>First Name</label>
                            <input type="text" placeholder="First Name" name="firstName"
                            onChange={(e) => this.handleChange(e)}/>
                        </div>

                        <div className="field">
                            <label>Last Name</label>
                            <input type="text" placeholder="Last Name" name="lastName"
                            onChange={(e) => this.handleChange(e)}/>
                        </div>
                    </div>

                    <div className="two fields">
                        <div className="field">
                            <label>SSN</label>
                            <input type="text" placeholder="Enter SSN" name="ssn"
                            onChange={(e) => this.handleChange(e)}/>
                        </div>
                    </div>

                    <div className="form-btns-container">
                        <button className="ui primary button" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                        <button className="ui button" onClick={(e) => this.props.toggleForm(e)}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewSkip;