import React from "react"

const SkipSearchRecords = (props) => {

    let {id, first_name, last_name, found, data_created} = props.skipObj

    let user, cuName;
    
    props.skipObj.user.username ? user = props.skipObj.user.username : user = 'User Deleted'
    props.skipObj.creditunion.name ? cuName = props.skipObj.creditunion.name : cuName = 'CU Deleted'


    return (
        <tr>
            <td>{user}</td>
            <td>{cuName}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{found ? 'Yes' : 'No'}</td>
            <td>{data_created}</td>
            <td>
                <input onChange={(e) => props.handleCheckbox(e, id)}
                type="checkbox" ></input>
            </td>
        </tr>
    )
}

export default SkipSearchRecords