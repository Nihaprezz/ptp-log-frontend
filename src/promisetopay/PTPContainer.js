import React from "react"
import NewPtp from "../forms/NewPtp"

class PTPContainer extends React.Component {
    constructor(){
        super();

        this.state = {
            newPtp: false,
            ptpType: "current"
        }
    }  
    
    renderSwitch = (param) => {
        switch(param) {
          case 'foo':
            return 'bar';
          default:
            return < NewPtp />;
        }
      }
    
    render(){

        return (
            <div>
                <div className="ptp-nav-buttons">
                    <button className="ui button green">New PTP</button>
                    <button className="ui button">Current PTP's</button>
                    <button className="ui button">Day Before PTP's</button>
                    <button className="ui button">Day After PTP's</button>
                    <button className="ui button">Follow Up PTP's</button>
                </div>

                <div>
                    {this.state.newPtp ? <div>PTP FORM</div>  : <div> {this.renderSwitch(this.state.ptpType)}</div>}
                </div>
            </div>
        )
    }
}

export default PTPContainer