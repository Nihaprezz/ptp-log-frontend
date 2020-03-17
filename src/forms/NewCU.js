import React from "react"

const backend_url = process.env.REACT_APP_BACKEND

class NewCU extends React.Component {
    constructor(){
        super();

        this.state = {
            creditUnion: "",
            streetAddress: "",
            state: "",
            city: "",
            zipCode: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        fetch(backend_url + 'creditunions', {
            method: 'POST', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                creditUnion: this.state
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data.name, ' has been added!')
        })
    }

    render(){
        return (
            <div>
                <form className="ui form form-container">
                    <div className="field">
                        <label>Credit Union Name</label>
                        <input onChange={(e) => this.handleChange(e)}
                        type="text" name="creditUnion" placeholder="Credit Union Name"/>
                    </div>

                    <div className="field">
                        <label>Street Address</label>
                        <input onChange={(e) => this.handleChange(e)}
                        type="text" name="streetAddress" placeholder="Street Address"/>
                    </div>

                    <div className="three fields">
                        <div className="field">
                        <label>State</label>
                        <select onChange={(e) => this.handleChange(e)}
                        className="ui fluid dropdown" name="state">
                                <option value="">State</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                            </select>
                        </div>

                        <div className="field">
                            <label>City</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" name="city" placeholder="City"></input>
                        </div>

                        <div className="field">
                            <label>Zip Code</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" name="zipCode" placeholder="Zip Code"></input>
                        </div>
                    </div>
                    
                    <div className="ui primary button" tabIndex="0" onClick={() => this.handleSubmit()}>Submit Credit Union</div>
                    <div className="ui button" onClick={() => this.props.closeForm()}>Close Form</div>


                </form>
            </div>
        )
    }
}

export default NewCU;