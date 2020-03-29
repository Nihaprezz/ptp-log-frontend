import React from "react";

class UpdateToRepo extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            repod_on: "",
            repo_company: props.recordObj.repo_company
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('Vehhicled Repod with following info', this.state)
    }
    
    render(){
        let {repod_on, repo_company} = this.state

        return (
            <div>
                <form className="ui form">
                    <h4 className="ui dividing header">Update To Repossession Status</h4>

                    <div className="field">
                        <label>Repossession Date</label>
                        <input type="date" onChange={(e) => this.handleChange(e)}
                        name="repod_on" value={repod_on}/>
                    </div>


                    <div className="field">
                        <label>Repossession Company</label>
                        <input type="text" onChange={(e) => this.handleChange(e)}
                        name="repo_company" value={repo_company}/>
                    </div>

                    <button onClick={(e) => this.onSubmit(e)}
                    className="ui secondary button">Repod Vehicle</button>

                </form>
            </div>
        )
    }
}

export default UpdateToRepo;