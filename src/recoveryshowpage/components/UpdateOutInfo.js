import React from "react";

class UpdateOutInfo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            repo_company: props.recordObj.repo_company,
            created_on: props.recordObj.created_on,
            comments: props.recordObj.comments
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('updating the repo info', this.state)
    }

    render(){
        let {repo_company, created_on, comments} = this.state

        return (
            <div>
                <h4 className="ui dividing header">Recovery Info</h4>

                <form className="ui form"> 
                    <div className="field">
                        <label>Repo Company</label>
                        <input onChange={(e) => this.handleChange(e)} 
                        name="repo_company" value={repo_company}/>
                    </div>
                
                    <div className="field">
                        <label>Placed Out On</label>
                        <input onChange={(e) => this.handleChange(e)}
                        name="created_on" type="date" value={created_on}/>
                    </div>

                    <div className="field">
                        <label>Comments</label>
                        <textarea onChange={(e) => this.handleChange(e)}
                        name="comments" value={comments}/>
                    </div>

                    <button onClick={(e) => this.handleSubmit(e)}
                    className="ui secondary button"> Update Repo </button>
                </form>
            </div>
        )
    }
}

export default UpdateOutInfo