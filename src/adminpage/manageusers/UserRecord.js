import React from "react";

const recordStyle = {
    display: 'grid'
}
 
const UserRecord = (props) => {
    console.log(props)
    
    return (
        <div style={recordStyle}>
            <p>{props.userObj.username}</p>
            <span className="ui button">Edit</span>
        </div>
    )
}

export default UserRecord;