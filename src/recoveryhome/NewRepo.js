import React from "react";
import Swal from "sweetalert2"
import { validateNewRepo } from "../utils/index"

const backend_url = process.env.REACT_APP_BACKEND

class NewRepo extends React.Component {
    constructor(){
        super();

        this.state = {
            acct_no: "",
            creditunion_id: "",
            first_name: "", 
            last_name: "",
            veh_make: "", 
            veh_model: "",
            veh_vin: "",
            veh_year: "",
            repo_company: "",
            user_id: "",
            comments: ""
        }
    }

    componentDidMount(){
        //users like ann and amy will not be able to create accounts under themselves.
        if(this.props.currentUser.isadmin){ 
            this.setState({user_id: this.props.currentUser.id})
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let {acct_no, creditunion_id, first_name, last_name, veh_year, veh_make, veh_model, veh_vin, 
        repo_company, user_id, comments} = this.state      
        
        if(validateNewRepo(acct_no, creditunion_id, first_name, last_name, veh_year, veh_make, veh_model, veh_vin, 
            repo_company, user_id)){
            fetch(backend_url + 'repo_orders',{
                method: 'POST', 
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }, 
                body: JSON.stringify({
                    acct_no, creditunion_id, first_name, last_name, veh_year, veh_make, veh_model, veh_vin, 
                    repo_company, user_id, comments
                })
            })
            .then(resp => resp.json())
            .then(newRepo => {
                if(newRepo.id){
                    Swal.fire('Created', 'Repo Order has been added', 'success')
                    this.props.updateRepos(newRepo)
                    this.resetFields()
                } else {
                    Swal.fire('Error', 'Cannot Create. Try Again', 'warning')
                }
            })
            .catch(err => Swal.fire('Error', `Cannot Create. Error: ${err} `, 'warning'))
        } else {
            Swal.fire('Cannot Sumit', 'Make sure all fields are filled.', 'warning')
        }
    }

    resetFields = () => {
        this.setState({acct_no: "", creditunion_id: "", first_name: "", last_name: "", veh_year: "",
        veh_make: "", veh_model: "", veh_vin: "", repo_company: "", user_id: "", comments: "" })
    }

    render(){
        return (
            <div className="new-repo-form">
                <form className="ui form">

                    <div className="two fields">
                        <div className="field">
                            <label>Acct Number</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" value={this.state.acct_no} name="acct_no" required/>
                        </div>

                        <div className="field">
                            <label>Credit Union</label>
                            <select onChange={(e) => this.handleChange(e)}
                            className="ui fluid dropdown" value={this.state.creditunion_id} name="creditunion_id" required>
                                <option value="">Select CU</option>
                                {this.props.allCUs.map(cu => {
                                    return <option key={cu.id} value={cu.id}>{cu.name}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="two fields">
                        <div className="field">
                            <label>First Name</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" value={this.state.first_name} name="first_name" required/>
                        </div>

                        <div className="field">
                            <label>Last Name</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" value={this.state.last_name} name="last_name" required/>
                        </div>
                    </div>

                    <h4 className="ui dividing header">Vehicle Information</h4>

                    <div className="four fields">
                        <div className="field">
                            <label>Year</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" value={this.state.veh_year} name="veh_year" required/>
                        </div>

                        <div className="field">
                            <label>Make</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" value={this.state.veh_make} name="veh_make" required/>
                        </div>

                        <div className="field">
                            <label>Model</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" value={this.state.veh_model} name="veh_model" required/>
                        </div>

                        <div className="field">
                            <label>Vin</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" value={this.state.veh_vin} name="veh_vin" required/>
                        </div>
                    </div>

                    <div className="two fields">
                        <div className="field">
                            <label>Repo Company</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" value={this.state.repo_company} name="repo_company" required/>
                        </div>

                        <div className="field">
                            <label>Recovery Specialist</label>
                            <select onChange={(e) => this.handleChange(e)}
                            className="ui fluid dropdown" name="user_id" value={this.state.user_id} required>
                                <option value="">Select User</option>
                                {this.props.recoveryUsers.map(user => {
                                    return <option key={user.id} value={user.id}>{user.username}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="field">
                        <label>Comments</label>
                        <textarea onChange={(e) => this.handleChange(e)}
                        name="comments" value={this.state.comments} />
                    </div>

                    <div className="new-repo-btns">
                        <button className="ui secondary button" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                        <button className="ui button" onClick={() => this.props.cancelForm()}>Cancel</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default NewRepo