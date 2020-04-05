import React from "react";
import Swal from 'sweetalert2'

const backend_url = process.env.REACT_APP_BACKEND

class UpdateSold extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            sale_date: props.record.auction_record.sale_date,
            sale_location: props.record.auction_record.auction_name,
            sold_amt: '',
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { sale_date, sale_location, sold_amt } = this.state;
        let repo_order_id = this.props.record.id

        fetch(backend_url + 'sold_records', {
            method: 'POST', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, 
            body: JSON.stringify({
                sale_date, sale_location, sold_amt, repo_order_id
            })
        })
        .then(resp => resp.json())
        .then(newSoldRecord => {
            if(newSoldRecord.id){
                Swal.fire('Sucess', 'Vehicle has been sold', 'success')
                .then(() => {
                    window.history.back();
                })
            } else {
                Swal.fire('Error', 'Unable to update record', 'error')
            }
        })
        .catch(err => alert(err))

    }

    render(){
        let {sale_date, sale_location, sold_amt} = this.state;
    
        return (
            <div className="recovery-record-form-conts">
                <form className="ui form">
                    <h4 className="ui dividing header">Update To Sold</h4>

                    <div className="three fields">
                        <div className="field">
                            <label>Sale Date</label>
                            <input onChange={(e) => this.onChange(e)}
                            type="date" value={sale_date} name="sale_date"/>
                        </div>

                        <div className="field">
                            <label>Sale Location</label>
                            <input onChange={(e) => this.onChange(e)}
                            type="text" value={sale_location} name="sale_location"/>
                        </div>

                        <div className="field">
                            <label>Sold Amount</label>
                            <input onChange={(e) => this.onChange(e)}
                            type="number" step="0.01" value={sold_amt} name="sold_amt"/>
                        </div>
                    </div>

                    <button onClick={(e) => this.handleSubmit(e)} className="ui secondary button">
                        Sold
                    </button>
                </form>
            </div>
        )
    }
}

export default UpdateSold