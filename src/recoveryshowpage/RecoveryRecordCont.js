import React from "react";
import MemberVehInfo from "./components/MemberVehInfo"
import UpdateOutinfo from "./components/UpdateOutInfo"
import UpdateToRepo from "./components/UpdateToRepo"
import HoldRepo from "./components/HoldRepo"

const backend_url = process.env.REACT_APP_BACKEND

const testStyle = {
    width: '90%',
    margin: 'auto'
}

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
        return (
            <div style={testStyle}>

                {this.state.recoveryRecord.length === 0 ? <h2>Loading....</h2> : (
                    <React.Fragment>
                        
                        < MemberVehInfo recordObj={this.state.recoveryRecord} /> 

                        <hr></hr>

                        {/* update section for recovery  */}
                        < UpdateOutinfo recordObj={this.state.recoveryRecord} />

                        <hr></hr>
                        {/* Section to update to repo */}
                        < UpdateToRepo recordObj={this.state.recoveryRecord} />

                        <hr></hr>
                        {/* Section to place repo on hold with follow up date */}
                        < HoldRepo />

                    </React.Fragment>
                )}

                <hr></hr>
                
                <form className="ui form">
                    <div className="field">
                        <button className="ui secondary button">Close Repo</button>
                    </div>
                </form>


                {/* Section to close repo */}
            </div>
        )
    }
}

export default RecoveryRecordCont;