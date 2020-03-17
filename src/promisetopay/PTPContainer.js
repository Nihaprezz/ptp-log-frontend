import React from "react"
import NewPtp from "../forms/NewPtp"
import PTPTable from "../promisetopay/PTPTable"
import { withRouter } from "react-router-dom"

const backend_url = process.env.REACT_APP_BACKEND

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
        if(this.props.location.state){
            let type = this.props.location.state;
            this.setState({ptpType: type}, () => this.fetchBackend(type))
        } else {
            this.fetchBackend(this.state.ptpType)
        }
    }

    fetchBackend = (type) => {
        fetch(backend_url +`promisetopays/categeory/${type}/`+ this.props.userid)
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
                    <button className="ui button" onClick={() => this.handlePTPChange('otptransfers')}>OTP/Transfers</button>
                </div>

                <div>
                    {this.state.newPtp ? < NewPtp allCUs={this.props.allCUs} />  : <PTPTable ptpTypes={this.state.ptpType} ptpData={this.state.ptpData}/>}
                </div>
            </div>
        )
    }
}

export default withRouter(PTPContainer);