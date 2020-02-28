import React from "react"
import PTPRecord from "./PTPRecord"


class PTPTable extends React.Component {
    render(){
        let allRecords =[]

        if (this.props.ptpData.length){
            allRecords = this.props.ptpData.map(record => {
                return (
                    < PTPRecord key={record.id} recordObj={record} />
                )
            })
        }


        return (
            <div>
                This will be the PTP Table
                <h1>{this.props.ptpTypes}</h1>
                <div>
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
                                {allRecords}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        )
    }
}

export default PTPTable