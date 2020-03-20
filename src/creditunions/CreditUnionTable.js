import React, { useState, useEffect } from "react"
import TableRow from "./TableRow"

const CreditUnionTable = (props) => {
    const [allCu, setAllCu] = useState([])

    useEffect(() => {
        setAllCu(props.allCUs)
    }, [props.allCUs])


    return (
        <div className="cu-table-container">
            <br></br>
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Street Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {allCu.map(cu => < TableRow key={cu.id} cu={cu} deleteCU={props.deleteCU}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default CreditUnionTable