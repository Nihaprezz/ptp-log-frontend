import React from "react";
import Swal from "sweetalert2";

const backend_url = process.env.REACT_APP_BACKEND

class RemoveHold extends React.Component {
    constructor(props){
        super(props);

        this.state = {
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

        let id = this.props.recordObj.id;
        let {repo_company} = this.state;

        fetch(backend_url + `/repo_orders/update_to_open/${id}`, {
            method: 'PATCH', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                repo_company
            }),
        })
        .then(resp => resp.json())
        .then(updatedRepo => {
            if(updatedRepo.message){
                Swal.fire('Success', 'Vehicle has been placed back out.', 'success')
                .then(() => {
                    window.history.back();
                })
            } else {
                Swal.fire('Error', 'Unable to update record.', 'warning')
            }
        })
        .catch(err => alert(err))
    }

    render(){
        return (
            <div className="recovery-record-form-conts">
                <form className="ui form">
                    <h4 className="ui dividing header">Remove Hold</h4>

                    <div className="field">
                        <label>Repo Company</label>
                        <input type="text" onChange={(e) => this.handleChange(e)}
                        name="repo_company" value={this.state.repo_company}/>
                    </div>

                    <button onClick={(e) => this.onSubmit(e)}
                    className="ui secondary button">Place Back Out</button>

                </form>
            </div>
        )
    }
}

export default RemoveHold