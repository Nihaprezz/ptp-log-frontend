import React, {useState, useEffect} from "react";
import FollowUpRows from "./componenets/FollowUpRows"

const backend_url = process.env.REACT_APP_BACKEND;

const FollowUpPage = (props) => {
    const [followUps, setFollowUps] = useState([])

    useEffect(() => {
        let id = props.user.id
        fetch(backend_url + `repo_orders/follow_ups/${id}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(followUpResults => {
            if(followUpResults.length > 0){
                setFollowUps(followUpResults)    
            } else {
                setFollowUps({message: 'No Follow Ups'})
            }
        })
        .catch(err => alert(err))
    }, [props.user.id])
    
    //query where repo order's follow up date is not nil and archive_record is false and repo'd is false
    console.log(followUps)
    return (
        <div>
            <h1>Follow Ups</h1>

            {followUps.length === 0 ? <h2>Loading...</h2> : (
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Acct No</th>
                            <th>Credit Union</th>
                            <th>Member Name</th>
                            <th>Vehicle</th>
                            <th>Vin</th>
                            <th>Follow Up Date</th>
                            <th>Repo Company</th>
                            <th>Comments</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {followUps.message ? <tr><td>No Follow Up Records</td></tr> : (
                            followUps.map(record => {
                                return < FollowUpRows key={record.id} repoObj={record}/>
                            })
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default FollowUpPage;