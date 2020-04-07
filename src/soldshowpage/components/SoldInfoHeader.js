import React from "react";

const SoldInfoHeader = (props) => {
    let {acct_no, first_name, last_name, repod_on, repo_company, veh_info, veh_vin } = props.soldRecord;
    let {sale_location, sold_amt} = props.soldRecord.sold_record;
    let { sale_date } = props.soldRecord.auction_record
    let name;
    props.soldRecord.creditunion ? name = props.soldRecord.creditunion.name : name = "CU Deleted"

    return (
        <div className="repo-order-details-cont">
            <div>
                <p>Acct No: {acct_no}</p>
                <p>Credit Union: {name}</p>
                <p>Member Name : {`${first_name} ${last_name}`}</p>
                <p>Transport Date: {repod_on}</p>
                <p>Vehicle: {veh_info}</p>
            </div>

            <div>
                <p>Repo Company: {repo_company}</p>
                <p>Sale Location: {sale_location}</p>
                <p>Sale Date: {sale_date}</p>
                <p>Sold Amt: ${sold_amt.toLocaleString()}</p>
                <p>Vin: {veh_vin}</p>
            </div>
        </div>   
    )
}

export default SoldInfoHeader;