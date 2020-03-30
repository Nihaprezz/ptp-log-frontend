import React from "react";
import Swal from "sweetalert2";

const backend_url = process.env.REACT_APP_BACKEND

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

        let recordId = this.props.recordObj.id;
        let {repo_company, created_on, comments} = this.state;

        fetch(backend_url + `repo_orders/${recordId}`, {
            method: 'PATCH', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, 
            body: JSON.stringify({
                repo_company, 
                created_on, 
                comments
            })
        })
        .then(resp => resp.json())
        .then(record => {
            if (record.message){
                Swal.fire('Updated', 'Repo Order has been updated.', 'success')
            } else {
                Swal.fire('Error', 'Was unable to update record.', 'warning')
            }
        })
        .catch(err => alert(err))

    }

    render(){
        let {repo_company, created_on, comments} = this.state

        return (
            <div className="recovery-record-form-conts">
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
                        name="created_on" type="date" value={created_on} required/>
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