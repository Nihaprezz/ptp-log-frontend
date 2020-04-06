import React from "react";
import SoldInfoHeader from "./components/SoldInfoHeader"

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
                    < SoldInfoHeader soldRecord={soldRecord}/>
                )}
            </div>
        )
    }
}

export default SoldShowPage