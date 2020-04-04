import React from "react";
import Swal from "sweetalert2"

const backend_url = process.env.REACT_APP_BACKEND

class UpdateAuction extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            auction_name: props.record.auction_record.auction_name,
            floor: props.record.auction_record.floor, 
            sale_date: props.record.auction_record.sale_date, 
            notes: props.record.auction_record.notes
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        let id = this.props.record.auction_record.id
        let { auction_name, floor, sale_date, notes } = this.state
        
        fetch(backend_url + `/auction_records/${id}`, {
            method: 'PATCH', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                auction_name, 
                floor, 
                sale_date, 
                notes
            })
        })
        .then(resp => resp.json())
        .then(updatedRecord => {
            if(updatedRecord.id){
                Swal.fire('Updated', 'Auction Info Updated', 'success')
                this.props.update(updatedRecord)
            }
        })
        .catch(err => alert(err))
    }


    render(){
        let { auction_name, floor, sale_date, notes } = this.state

        return (
            <div className="recovery-record-form-conts">
                <form className="ui form">
                    <h4 className="ui dividing header">Update Auction Info</h4>

                    <div className="three fields">
                        <div className="field">
                            <label>Auction Name</label>
                            <input onChange={(e) => this.onChange(e)}
                            type="text" value={auction_name} name="auction_name"/>
                        </div>

                        <div className="field">
                            <label>Floor</label>
                            <input onChange={(e) => this.onChange(e)}
                            type="number" step="0.01" value={floor ? floor : ""} name="floor"/>
                        </div>

                        <div className="field">
                            <label>Sale Date</label>
                            <input onChange={(e) => this.onChange(e)}
                            type="date" value={sale_date ? sale_date : ""} name="sale_date"/>
                        </div>
                    </div>

                    <div className="field">
                        <label>Auction Notes</label>
                        <textarea value={notes ? notes : ""} name="notes" onChange={(e) => this.onChange(e)}/>
                    </div>

                    <button className="ui secondary button" onClick={(e) => this.onSubmit(e)}>
                        Update
                    </button>
                </form>
            </div>
        )
    }
}

export default UpdateAuction