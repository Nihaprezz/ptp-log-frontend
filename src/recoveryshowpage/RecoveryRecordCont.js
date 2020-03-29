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
        })
        .catch(err => console.log(err))
    }
    
    render(){
        console.log(this.state)
        return (
            <div>
                {this.state.recoveryRecord.length === 0 ? <h2>Loading....</h2> : (
                    < MemberVehInfo recordObj={this.state.recoveryRecord} /> 
                )}

                <hr></hr>
                {/* update section for recovery  */}

                {/* Section to update to repo */}

                {/* Section to place repo on hold with follow up date */}

                {/* Section to close repo */}
            </div>
        )
    }
}

export default RecoveryRecordCont;