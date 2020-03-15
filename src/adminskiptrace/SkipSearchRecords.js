import React from "react"

const SkipSearchRecords = (props) => {

    let {first_name, last_name, found, data_created} = props.skipObj
    let user = props.skipObj.user.username
    let cuName = props.skipObj.creditunion.name

    return (
        <tr>
            <td>{user}</td>
            <td>{cuName}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{found ? 'Yes' : 'No'}</td>
            <td>{data_created}</td>
            <td>
                <input type="checkbox" />
            </td>
        </tr>
    )
}

export default SkipSearchRecords