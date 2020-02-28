import React from "react"
import NewPtp from "../forms/NewPtp"
import PTPTable from "../promisetopay/PTPTable"

const backend_url = `http://localhost:3001/`

class PTPContainer extends React.Component {
    constructor(){
        super();

        this.state = {
            newPtp: false,
            ptpType: "current", 
            ptpData: []
        }
    } 
    
    componentDidMount(){
        this.fetchBackend(this.state.ptpType)
    }

    fetchBackend = (type) => {
        fetch(backend_url +`promisetopays/categeory/${type}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({ptpData: data})
        })
    }

    toggleForm = () => {
        this.setState({newPtp: !this.state.newPtp})
    }

    handlePTPChange = (type) => {
        this.setState({newPtp: false, ptpType: type}, () => this.fetchBackend(type))
    }
    
    render(){

        return (
            <div>
                <div className="ptp-nav-buttons">
                    <button className="ui button green" onClick={() => this.toggleForm()}>New PTP</button>
                    <button className="ui button" onClick={() => this.handlePTPChange('current')}>Current PTP's</button>
                    <button className="ui button" onClick={() => this.handlePTPChange('daybefore')}>Day Before PTP's</button>
                    <button className="ui button" onClick={() => this.handlePTPChange('dayafter')}>Day After PTP's</button>
                    <button className="ui button" onClick={() => this.handlePTPChange('followups')}>Follow Up PTP's</button>
                </div>

                <div>
                    {this.state.newPtp ? < NewPtp />  : <PTPTable ptpTypes={this.state.ptpType} ptpData={this.state.ptpData}/>}
                </div>
            </div>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchPTPData: (type) => {dispatch(fetchPTPData(type))}
//     }
// }

// const mapStateToProps = state => {
//     return {
//         ptpData: state.ptpData
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(PTPContainer)

export default PTPContainer