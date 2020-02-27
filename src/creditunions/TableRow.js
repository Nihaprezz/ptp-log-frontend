import React from "react"

const TableRow = (props) => {
    let {name, street_address, city, state, zip_code} = props.cu

    return (
        <tr>
            <td>{name}</td>
            <td>{street_address}</td>
            <td>{city}</td>
            <td>{state}</td>
            <td>{zip_code}</td>
        </tr>
    )
}

export default TableRow