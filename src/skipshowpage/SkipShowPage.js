import React from "react"
import SkipDetails from "./SkipDetails"

const backend_url = `http://localhost:3001/`

class SkipShowPage extends React.Component {
    constructor(){
        super();

        this.state = {
            skipRecord: []
        }
    }

    componentDidMount(){
        fetch(backend_url + `skips/${this.props.skipID}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(skipData => this.setState({skipRecord: skipData}))
        .catch(err => alert(err))
    }

    goBack(){
        this.props.history.goBack();
    }

    render(){
        return (
            <div>
                {this.state.skipRecord.length === 0 ? <h3>Loading...</h3> : (
                    < SkipDetails skipObj={this.state.skipRecord} />
                )}
                
            </div>
        )
    }
}

export default SkipShowPage;