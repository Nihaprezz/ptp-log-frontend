import React from "react"
import { Link } from "react-router-dom"
import AdminSkipRecord from "./AdminSkipRecord" 
import Swal from "sweetalert2"

const backend_url = `http://localhost:3001/`

class AdminSkipTrace extends React.Component {
    constructor(){
        super();

        this.state = {
            skipData: []
        }
    }

    componentDidMount(){
        fetch(backend_url + 'skips', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'  
            }
        })
        .then(resp => resp.json())
        .then(skips => {
            this.setState({skipData: skips})
        })
        .catch(err => alert(err))
    }

    updateResults = (id) => {
        console.log('attempting to update')
        Swal.fire({
            title:'Update Skip Results', 
            input: 'textarea', 
            showCancelButton: true, 
            confirmButtonText: 'Update', 
            showLoaderOnConfirm: true, 
            preConfirm: (textInput) => {
                return fetch(backend_url + `skips/${id}`, {
                    method: 'PATCH',
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                        "Content-Type": 'application/json',
                        "Accept": 'application/json'
                    }, 
                    body: JSON.stringify({
                        results: textInput
                    })
                })
                .then(resp => resp.json())
                .then(skipRecord => {
                    if(skipRecord.id){
                        let filtered = [...this.state.skipData].filter(record => record.id !== skipRecord.id)
                        this.setState({skipData: filtered})
                        Swal.fire('Success', 'Results have been entered', 'success');
                    } else  {
                        Swal.fire('Error', `${skipRecord.message}`, 'error')
                    }
                })
                .catch(error => Swal.showValidationMessage(`Request failed: ${error}`))
            }
        })
    
    }

    render(){
        return(
            <div>
                <h1>Pending Skips</h1>
                < Link className="ui left floated button" to="/skip_trace" >My Skips</Link>
                <div className="skip-trace-table">
                    {this.state.skipData.length === 0 ? <h3>Loading... </h3>: (
                          <table className="ui celled table">
                          <thead>
                              <tr>
                                  <th>User</th>
                                  <th>Credit Union</th>
                                  <th>Acct No</th>
                                  <th>Member Name</th>
                                  <th>SSN</th>
                                  <th>Date Submitted</th>
                                  <th>Update</th>
                              </tr>
                          </thead>
                          <tbody>
                            {this.state.skipData.message ? <tr><td>{this.state.skipData.message}</td></tr>: (
                                this.state.skipData.map(skip => {
                                    return <AdminSkipRecord key={skip.id} skipObj={skip}
                                    updateResults={this.updateResults}/>
                                })
                            )}
                          </tbody>
                      </table>
                    )}
                </div>
            </div>
        )
    }
}

export default AdminSkipTrace;