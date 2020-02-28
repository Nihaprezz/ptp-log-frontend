import React from "react"
import PTPRecord from "./PTPRecord"

const backend_url = `http://localhost:3001/`

class PTPTable extends React.Component {
    constructor(){
        super();

        this.state = {
            ptpData: [],
            ptpType: ""
        }
    }

    componentDidMount(){
        this.fetchBackend(this.props.ptpTypes)
    }

    fetchBackend = (type) => {
        this.setState({ptpType: this.props.ptpTypes})

        fetch(backend_url + `promisetopays/categeory/${type}`,{
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json' 
            }
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({ptpData: data})
        })
    }

    render(){
        
        let allRecords = this.state.ptpData.map(record => {
            return (
                < PTPRecord key={record.id} recordObj={record} />
            )
        })

        return (
            <div>
                This will be the PTP Table
                <h1>{this.props.ptpTypes}</h1>
                <div>
                    {this.state.ptpData.length === 0 ? <h3>Loading...</h3> : (
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