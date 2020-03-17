import React from "react"
import PTPRecord from "./PTPRecord"


class PTPTable extends React.Component {
    render(){
        let allRecords =[]

        if (this.props.ptpData.length){
            allRecords = this.props.ptpData.map(record => {
                return (
                    < PTPRecord key={record.id} recordObj={record} ptpType={this.props.ptpTypes}/>
                )
            })
        }

        let tableHdr = "";
        if(this.props.ptpTypes === "daybefore"){
            tableHdr = "Day Before"
        } else if (this.props.ptpTypes === "dayafter"){
            tableHdr = "Day After"
        } else if (this.props.ptpTypes === "otptransfers"){
            tableHdr = "OTP or Tranfer"
        } else {
            tableHdr = "Current"
        }


        return (
            <div>
                <h3 className="ptp-table-header">{tableHdr} PTP's</h3>
                <div className="ptp-table-container">
                    {this.props.ptpData.length === 0 ? <h3>Loading...</h3> : (
                        <table className="ui celled table">
                            <thead>
                                <tr>
                                    <th>Acct No</th>
                                    <th>CU Name</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>PTP Amount</th>
                                    <th>PTP Date</th> 
                                    <th></th>   
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.ptpData.length ? allRecords: <tr><td>{this.props.ptpData.message}</td></tr>}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        )
    }
}

export default PTPTable