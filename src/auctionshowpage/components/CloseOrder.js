import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"

const backend_url = process.env.REACT_APP_BACKEND

const CloseOrder = (props) => {

    const reasonToClose = (e) =>{
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
                    closeRepo(reason)
                }
            }
        })
    }

    const closeRepo = (reason) => {
        let id = props.record.id

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
  
    return (
        <div className="recovery-record-form-conts">
            <form className="ui form">
                <div className="field recovery-record-btns-cont">
                    <button className="ui red button close-repo-btn" onClick={(e) => reasonToClose(e)}>
                        Close Repo
                    </button>

                    < Link className="ui button back-repo-btn" to={{pathname: `/auction`, state: {showAuction: true}}} > 
                        Back 
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default CloseOrder;

