import React from "react";

const backend_url = process.env.REACT_APP_BACKEND

class HoldRepo extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            follow_up: "",
            comments: "",
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        console.log('holding the repo', this.state)
    }
    
    render(){

        return (
            <div>
                <form className="ui form">
                    <h4 className="ui dividing header">Hold Repo Order</h4>

                    <div className="field">
                        <label>Follow Up Date</label>
                        <input type="date" onChange={(e) => this.handleChange(e)}
                        name="follow_up" value={this.state.follow_up}/>
                    </div>


                    <div className="field">
                        <label>Reason For Hold</label>
                        <input type="text" onChange={(e) => this.handleChange(e)}
                        name="comments" value={this.state.comments}/>
                    </div>

                    <button onClick={(e) => this.onSubmit(e)}
                    className="ui secondary button">Hold Repo</button>

                </form>
            </div>
        )
    }
}

export default HoldRepo;