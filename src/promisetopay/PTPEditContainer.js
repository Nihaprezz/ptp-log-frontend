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


    render(){
        console.log(this.state)
        return(
            <div>
                PTP CONTAINER
                <Link className="ui button" to="/">Back Home</Link>
                {this.state.ptpInfo.length === 0 ? <h3>Loading...</h3> : < PTPEdit ptpObj={this.state.ptpInfo}/>}
            </div>
        )
    }
}

export default PTPEditContainer