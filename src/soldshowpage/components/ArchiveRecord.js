import React from "react";
import Swal from "sweetalert2"

const backend_url = process.env.REACT_APP_BACKEND

class ArchiveRecord extends React.Component {

    archiveUpdate = (e) => {
        e.preventDefault();

        let id = this.props.soldRecord.id;
        fetch(backend_url + `sold_records/update/archive/${id}`, {
            method: 'PATCH', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                archive_record: true
            })
        })
        .then(resp => resp.json())
        .then(updatedRecord => {
            if(updatedRecord.id){
                Swal.fire('Updated', 'Record has been archived', 'success')
                .then(() => {
                    window.history.back();
                })
            } else {
                Swal.fire('Error', 'Unable to update', 'error')
            }
        })
        .catch(err => alert(err))
    }

    render(){
        return (
            <div className="recovery-record-form-conts">
                <h4 className="ui dividing header">Archive Record</h4>
                <p>If you are done with the process. Archive the repo record.</p>

                <button onClick={(e) => this.archiveUpdate(e)} className="ui secondary button">Archive</button>
            </div>
        )
    }
}

export default ArchiveRecord