import React from "react";
import Swal from "sweetalert2";

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

        let id = this.props.recordObj.id
        let {follow_up, comments} = this.state

        if(follow_up !== ""){
            fetch(backend_url + `/repo_orders/update_to_hold/${id}`, {
                method: 'PATCH', 
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }, 
                body: JSON.stringify({
                    follow_up,
                    comments
                })
            })
            .then(resp => resp.json())
            .then(updatedRepo => {
                if(updatedRepo.message){
                    Swal.fire('On Hold', 'Repo Order has been moved to Hold.', 'success')
                    .then(() => {
                        window.history.back();
                    })
                    
                } else {
                    Swal.fire('Errror', 'Unable to update repo. Try again.', 'error')
                }
            })
            .catch(err => alert(err))
        } else {
            Swal.fire('Unable to update', 'Make sure all fields are filled', 'warning')
        }

    }
    
    render(){

        return (
            <div className="recovery-record-form-conts">
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