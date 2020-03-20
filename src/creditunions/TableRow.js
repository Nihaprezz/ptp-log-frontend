import React from "react"

const TableRow = (props) => {
    let {id, name, street_address, city, state, zip_code} = props.cu

    return (
        <tr>
            <td>{name}</td>
            <td>{street_address}</td>
            <td>{city}</td>
            <td>{state}</td>
            <td>{zip_code}</td>
            <td>
                <button className="ui red button" onClick={() => props.deleteCU(id)}>Delete</button>
            </td>
        </tr>
    )
}

export default TableRow