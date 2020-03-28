import React from "react";
import MemberVehInfo from "./components/MemberVehInfo"

const backend_url = process.env.REACT_APP_BACKEND

class RecoveryRecordCont extends React.Component {
    constructor(){
        super();

        this.state = {
            recoveryRecord: []
        }
    }

    componentDidMount(){
        fetch(backend_url + `repo_orders/${this.props.recoveryId}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(repoRecord => {
            this.setState({recoveryRecord: repoRecord})
            console.log(repoRecord)
        })
        .catch(err => console.log(err))
    }
    
    render(){
        console.log(this.props)
        return (
            <div>Recovery record container

                < MemberVehInfo recordObj={this.state.recoveryRecord}/>
            </div>
        )
    }
}

export default RecoveryRecordCont;