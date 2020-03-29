import React from "react";
import MemberVehInfo from "./components/MemberVehInfo"
import UpdateOutinfo from "./components/UpdateOutInfo"
import UpdateToRepo from "./components/UpdateToRepo"
import HoldRepo from "./components/HoldRepo"
import Swal from "sweetalert2";

const backend_url = process.env.REACT_APP_BACKEND

const testStyle = {
    width: '90%',
    margin: 'auto'
}

class RecoveryRecordCont extends React.Component {
    constructor(){
        super();

        this.state = {
            recoveryRecord: []
        }
    }

    componentDidMount(){
        fetch(backend_url + `repo_orders/${this.props.recoveryId}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(repoRecord => {
            this.setState({recoveryRecord: repoRecord})
        })
        .catch(err => console.log(err))
    }

    closeRepoOrder = (e) => {
        e.preventDefault();
        
        let id = this.state.recoveryRecord.id
        fetch(backend_url + `/repo_orders/update_to_close/${id}`, {
            method: 'PATCH', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, 
            body: JSON.stringify({
                closed_repo: true
            })
        })
        .then(resp => resp.json())
        .then(closedRepo => {
            if(closedRepo.message){
                Swal.fire('Closed', 'Repo order has been closed.', 'success')
                .then(() => {
                    window.history.back();
                })
            } else {
                Swal.fire('Error', 'Unable to update repo.', 'error')
            }
        })
    }
    
    render(){
        return (
            <div style={testStyle}>

                {this.state.recoveryRecord.length === 0 ? <h2>Loading....</h2> : (
                    <React.Fragment>
                        
                        < MemberVehInfo recordObj={this.state.recoveryRecord} /> 

                        <hr></hr>

                        {/* update section for recovery  */}
                        < UpdateOutinfo recordObj={this.state.recoveryRecord} />

                        <hr></hr>
                        {/* Section to update to repo */}
                        < UpdateToRepo recordObj={this.state.recoveryRecord} />

                        <hr></hr>
                        {/* Section to place repo on hold with follow up date */}
                        < HoldRepo recordObj={this.state.recoveryRecord} />

                    </React.Fragment>
                )}

                <hr></hr>
                
                <form className="ui form">
                    <div className="field">
                        <button className="ui secondary button" onClick={(e) => this.closeRepoOrder(e)}>
                            Close Repo
                        </button>
                    </div>
                </form>


                {/* Section to close repo */}
            </div>
        )
    }
}

export default RecoveryRecordCont;