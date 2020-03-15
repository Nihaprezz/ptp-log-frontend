import React from "react"
import SkipDetails from "./SkipDetails"

const backend_url = `http://localhost:3001/`

class SkipShowPage extends React.Component {
    constructor(){
        super();

        this.state = {
            skipRecord: [],
            foundUser: false
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

    updateSkip = (id) => {
        fetch(backend_url + `skips/user_update/${id}`, {
            method: 'PATCH', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json' 
            }, 
            body: JSON.stringify({
                found: this.state.foundUser
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            debugger
            console.log(resp)
        })
        .catch(err => alert(err))
    }

    handleFoundCheck = (e) => {
        this.setState({foundUser: e.target.checked})
    }

    render(){
        return (
            <div>
                {this.state.skipRecord.length === 0 ? <h3>Loading...</h3> : (
                    < SkipDetails skipObj={this.state.skipRecord} updateSkip={this.updateSkip} 
                    handleFoundCheck={this.handleFoundCheck} />
                )}
                
            </div>
        )
    }
}

export default SkipShowPage;