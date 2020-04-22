import React from "react";

const MemberVehInfo = (props) => {
    let { acct_no, first_name, last_name, veh_info, veh_vin } = props.recordObj;
    let cuName = props.recordObj.creditunion.name

    return (
        <div className="repo-order-details-cont">
            <div>
                <p>Acct No: {acct_no}</p>
                <p>Credit Union: {cuName}</p>
            </div>

            <div>
                <p>Member: {`${first_name} ${last_name}`}</p>
                <p>Vehicle: {veh_info}</p>
                <p>Vin: {veh_vin}</p> 
            </div>
        </div>
    )
}

export default MemberVehInfo;