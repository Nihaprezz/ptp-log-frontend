import React from "react";
import { Link } from "react-router-dom";
import PTPEdit from "../forms/PTPedit"
import Swal from "sweetalert2"

const backend_url = `http://localhost:3001/`

class PTPEditContainer extends React.Component {
    constructor(){
        super();

        this.state = {
            ptpInfo: []
        }
    }

    componentDidMount(){
        fetch(backend_url + `promisetopays/${this.props.ptpID}`)
        .then(resp => resp.json())
        .then(ptp => {
            this.setState({ptpInfo: ptp})
        })
    }

    updatePTP = (ptpData, id) => {
        let {accountNo, creditUnion, firstName, lastName, ptpAmt, ptpDate, comments, collectedAmt, followedPTP, moveOTP, closed_ptp} = ptpData

        let followed_up = followedPTP ? 1 : 0

        fetch(backend_url + `promisetopays/${id}`,{
            method: 'PATCH',
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, 
            body: JSON.stringify({
                account_no: accountNo,
                creditunion: creditUnion,
                firstName: firstName,
                lastName: lastName,
                ptp_amt: ptpAmt,
                ptp_date: ptpDate,
                comments: comments,
                collectedAmt: collectedAmt,
                followed_up: followed_up,
                otp_or_transer: moveOTP, 
                closed_ptp: closed_ptp,
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.message === "updated"){
                Swal.fire('Updated', `PTP has been ${data.message}`, 'success')
                .then(() => window.history.back());
            } else {
                Swal.fire('Error', 'Something seemed to go wrong..', 'error')
            }
        })
        .catch(err => alert(err))
    }



    render(){
    
        return(
            <div>
                PTP CONTAINER
                <Link className="ui button" to="/">Back Home</Link>
                {this.state.ptpInfo.length === 0 ? <h3>Loading...</h3> : < PTPEdit ptpObj={this.state.ptpInfo} updatePTP={this.updatePTP} allCUs={this.props.allCUs}/>}
            </div>
        )
    }
}

export default PTPEditContainer