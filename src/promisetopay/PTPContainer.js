import React from "react"
import NewPtp from "../forms/NewPtp"
import PTPTable from "../promisetopay/PTPTable"

class PTPContainer extends React.Component {
    constructor(){
        super();

        this.state = {
            newPtp: false,
            ptpType: "current"
        }
    }  
    
    // renderSwitch = (param) => {
    //     switch(param) {
    //       case "current":
    //         return < PTPTable ptpTypes={"current"}/>;
    //       case 'daybefore':
    //           return < PTPTable ptpTypes={"daybefore"}/>;
    //       case 'dayafter':
    //         return < PTPTable ptpTypes={"dayafter"}/>;
    //      case 'followups':
    //         return < PTPTable ptpTypes={"followups"}/>;
    //       default:
    //         return < NewPtp />;
    //     }
    // }

    toggleForm = () => {
        this.setState({newPtp: !this.state.newPtp})
    }

    handlePTPChange = (type) => {
        this.setState({newPtp: false, ptpType: type})
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
                    {this.state.newPtp ? < NewPtp />  : <PTPTable ptpTypes={this.state.ptpType}/>}
                </div>
            </div>
        )
    }
}

export default PTPContainer