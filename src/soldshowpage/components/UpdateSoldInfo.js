import React from "react";
import Swal from "sweetalert2";

const backend_url = process.env.REACT_APP_BACKEND

class UpdateSoldInfo extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            cu_check_sent: props.soldRecord.sold_record.cu_check_sent, 
            deficiency_amt: props.soldRecord.sold_record.deficiency_amt,
            deficiency_sent: props.soldRecord.sold_record.deficiency_sent,
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDropDown = (e) => {
        this.setState({cu_check_sent: e.target.value})
    }

    submitUpdate = (e) => {
        e.preventDefault();
        let id = this.props.soldRecord.sold_record.id;
        let {cu_check_sent, deficiency_amt, deficiency_sent} = this.state
        
        fetch(backend_url + `sold_records/${id}`, {
            method: 'PATCH',
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, 
            body: JSON.stringify({
                cu_check_sent, deficiency_amt, deficiency_sent
            })
        })
        .then(resp => resp.json())
        .then(newRecord => {
            if(newRecord.id){
                Swal.fire("Updated", 'Record has been updated', 'success')
            } else {
                Swal.fire('Error', 'Unable to update. Check fields and try again', 'error')
            }
        })

    }

    render(){
        let {cu_check_sent, deficiency_amt, deficiency_sent} = this.state;

        return (
            <div className="recovery-record-form-conts">
                <form className="ui form">
                    <h4 className="ui dividing header">Update Sold Info</h4>

                    <div className="three fields">
                        <div className="field">
                            <label>Deficiency Amount</label>
                            <input onChange={(e) => this.onChange(e)}
                            type="number" step="0.01" value={deficiency_amt ? deficiency_amt : ""} 
                            name="deficiency_amt"/>
                        </div>

                        <div className="field">
                            <label>Deficiency Ltr Sent</label>
                            <input onChange={(e) => this.onChange(e)}
                            type="date" value={deficiency_sent ? deficiency_sent : ""} name="deficiency_sent"/>
                        </div>

                        <div className="field">
                            <label>Credit Union Check Sent</label>
                            <select onChange = {(e) => this.handleDropDown(e)} name="deficiency_sent"
                            className="ui fluid dropdown" value={cu_check_sent ? cu_check_sent : false}>
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                        </div>
                    </div>

                    <button className="ui secondary button" onClick={(e) => this.submitUpdate(e)}>
                        Update
                    </button>
                </form>
            </div>
        )
    }
}

export default UpdateSoldInfo