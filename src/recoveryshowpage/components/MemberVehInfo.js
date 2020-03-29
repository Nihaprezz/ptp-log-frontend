import React from "react";

const MemberVehInfo = (props) => {
    let { acct_no, first_name, last_name, veh_info, veh_vin } = props.recordObj;
    let cuName = props.recordObj.creditunion.name

    return (
        <div>
            <div>
                <h2>Acct No: {acct_no}</h2>
                <h2>Credit Union: {cuName}</h2>
                <h2>Member: {`${first_name} ${last_name}`}</h2>
                <h2>Vehicle: {veh_info}</h2>
                <h2>Vin: {veh_vin}</h2>
            </div>
        </div>
    )
}

export default MemberVehInfo;