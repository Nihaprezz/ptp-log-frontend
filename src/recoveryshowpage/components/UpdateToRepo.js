import React from "react";
import Swal from "sweetalert2";

const backend_url = process.env.REACT_APP_BACKEND

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

        let id = this.props.recordObj.id;
        let { repod_on, repo_company } = this.state

        if (repod_on !== "") {
            fetch(backend_url + `/repo_orders/update_to_repo/${id}`, {
                method: 'PATCH',
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }, 
                body: JSON.stringify({
                    repod_on,
                    repo_company
                })
            })
            .then(resp => resp.json())
            .then(updatedRepo => {
                if(updatedRepo.message){
                    Swal.fire('Repod!', 'Vehicle has been repod.', 'success')
                    .then(() => {
                        window.history.back();
                    })
                } else {
                    Swal.fire('Error', 'Unable to update. Try again.', 'error')
                }
            })
            .catch(err => alert(err))
        } else {
            Swal.fire('Unable to Submit', 'Make sure all fields are filled.', 'info')
        }
  
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
                        name="repod_on" value={repod_on} required/>
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