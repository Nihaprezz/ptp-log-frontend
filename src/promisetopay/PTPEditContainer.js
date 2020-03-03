import React from "react";
import { Link } from "react-router-dom";
import PTPEdit from "../forms/PTPedit"

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

        console.log('attempting to update ptp', ptpData)
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
            console.log(data)
            debugger
        })
    }



    render(){
        return(
            <div>
                PTP CONTAINER
                <Link className="ui button" to="/">Back Home</Link>
                {this.state.ptpInfo.length === 0 ? <h3>Loading...</h3> : < PTPEdit ptpObj={this.state.ptpInfo} updatePTP={this.updatePTP}/>}
            </div>
        )
    }
}

export default PTPEditContainer