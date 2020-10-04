import React from "react";
import MemberVehInfo from "./components/MemberVehInfo"
import UpdateOutinfo from "./components/UpdateOutInfo"
import UpdateToRepo from "./components/UpdateToRepo"
import HoldRepo from "./components/HoldRepo"
import { Link } from "react-router-dom"
import Swal from "sweetalert2";
import "./recovery_record.css"
import RemoveHold from "./components/RemoveHold";
import { withRouter } from "react-router-dom"

const backend_url = process.env.REACT_APP_BACKEND

class RecoveryRecordCont extends React.Component {
    constructor(){
        super();

        this.state = {
            recoveryRecord: [],
            deleted: false,
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
            if(repoRecord.id && !repoRecord.creditunion) {
                repoRecord.creditunion = {name: "Invalid CU Name"}
            }
            this.setState({recoveryRecord: repoRecord})
        })
        .catch(err => console.error(err));
    }

    closeRepoOrder = (reason) => {
        let id = this.state.recoveryRecord.id
        fetch(backend_url + `/repo_orders/update_to_close/${id}`, {
            method: 'PATCH', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, 
            body: JSON.stringify({
                closed_repo: true, 
                closed_reason: reason
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

    getCloseReason = (e) => {
        e.preventDefault();
        
        Swal.fire({
            title: 'Enter Reason for Closing',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Close Repo',
            showLoaderOnConfirm: true,
            preConfirm: (reason) => {
                if(reason === ""){
                    Swal.showValidationMessage(
                        `Failed: Enter a reason for closing.`
                    )
                } else {
                    this.closeRepoOrder(reason)
                }
            }
        })
    }
    
    renderBackBtn = () => {
        if(this.props.location.state === 'follow_ups'){
            return <Link className="ui button back-repo-btn" to="/repo_follow_ups">Back</Link>
        } else if (this.props.location.state === 'hold_repo'){
            return <Link className="ui button back-repo-btn" to={{pathname: "/", state: 'hold_status'}}>Back</Link> 
        } else {
            return <Link className="ui button back-repo-btn" to="/" > Back </Link> 
        }
    }

    deleteRepo = (e) => {
        e.preventDefault();
        const records = [this.state.recoveryRecord.id];
        fetch(backend_url + 'repo_orders/delete_by_batch/1', {
            method: 'DELETE', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'  
            }, 
            body: JSON.stringify({
                records
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.message){
                Swal.fire('Sucess', 'Record have been deleted', 'success');
                this.setState({deleted: true});
            } else {
                Swal.fire('Error', 'Error occurred. Try again', 'error')   
            }
        });
    }

    render(){
        return (
            <div className="recovery-record-cont ui card">

                {this.state.recoveryRecord.length === 0 ? <h2>Loading....</h2> : (
                    <React.Fragment>
                        {this.state.deleted ? (
                            <div className="record-deleted">Record has been deleted.</div>
                        ): null}
                        < MemberVehInfo recordObj={this.state.recoveryRecord} /> 

                        {/* update section for recovery  */}
                        < UpdateOutinfo recordObj={this.state.recoveryRecord} />

                        {/* Section to update to repo */}
                        < UpdateToRepo recordObj={this.state.recoveryRecord} />
             
                        {/* Section to place repo on hold with follow up date */}
                        {this.state.recoveryRecord.hold_order ? (
                            < RemoveHold recordObj={this.state.recoveryRecord} />
                        ) : (
                           < HoldRepo recordObj={this.state.recoveryRecord} /> 
                        )}
                        

                        <div className="recovery-record-form-conts">
                            <form className="ui form">
                                <div className="field recovery-record-btns-cont">
                                    {this.state.recoveryRecord.creditunion.name === "Invalid CU Name" ? (
                                        <button className="ui red button close-repo-btn" onClick={(e) => this.deleteRepo(e)}>
                                            Delete Repo
                                        </button>
                                    ) : (
                                        <button className="ui red button close-repo-btn" onClick={(e) => this.getCloseReason(e)}>
                                            Close Repo
                                        </button>
                                    )}
                                    

                                    {this.renderBackBtn()}
                                </div>
                            </form>
                        </div>

                    </React.Fragment>
                )}

             
            </div>
        )
    }
}

export default withRouter(RecoveryRecordCont);