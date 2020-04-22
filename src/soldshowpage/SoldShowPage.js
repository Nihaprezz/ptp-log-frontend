import React from "react";
import SoldInfoHeader from "./components/SoldInfoHeader"
import UpdateSoldInfo from "./components/UpdateSoldInfo"
import ArchiveRecord from "./components/ArchiveRecord"
import { Link } from "react-router-dom"

const backend_url = process.env.REACT_APP_BACKEND

class SoldShowPage extends React.Component {
    constructor(){
        super();

        this.state = {
            soldRecord: []
        }
    }

    componentDidMount(){
        let id = this.props.soldID
        fetch(backend_url + `sold_records/${id}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(record => this.setState({soldRecord: record}))
        .catch(err => alert(err))
    }

    render(){
        let { soldRecord } = this.state;

        return (
            <div className="recovery-record-cont ui card">
                {this.state.soldRecord.length === 0 ? <h2>Loading...</h2> : (
                    <React.Fragment>
                        < SoldInfoHeader soldRecord={soldRecord}/>

                        < UpdateSoldInfo soldRecord={soldRecord} />

                        < ArchiveRecord soldRecord={soldRecord} />
                    </React.Fragment>
                )}
                <div className="recovery-record-form-conts" style={{textAlign: "right"}}>
                
                    <Link to="/sold" className="ui button">Back</Link>

                </div>
 
            </div>
        )
    }
}

export default SoldShowPage