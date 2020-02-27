import React, { useState, useEffect } from "react"
import TableRow from "./TableRow"

const backend_url = `http://localhost:3001`

const CreditUnionTable = (props) => {
    const [allCu, setAllCu] = useState([])

    useEffect(() => {
        fetch(backend_url + '/creditunions',{
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => setAllCu(data))
    }, [])


    return (
        <div>
            <br></br>
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Street Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {allCu.map(cu => < TableRow key={cu.id} cu={cu}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default CreditUnionTable