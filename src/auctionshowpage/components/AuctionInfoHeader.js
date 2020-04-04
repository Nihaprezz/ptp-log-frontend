import React from "react"

const AuctionInfoHeader = (props) => {
    let { acct_no, first_name, last_name, veh_info, veh_vin, repo_company, repod_on } = props.record;
    let { transport_date } = props.record.auction_record;
    let { name } = props.record.creditunion;
    

    return (
        <div className="repo-order-details-cont">
            <div>
                <p>Acct No: {acct_no}</p>
                <p>Credit Union: {name}</p>
                <p>Member Name : {`${first_name} ${last_name}`}</p>
                <p>Transport Date: {transport_date}</p>
            </div>

            <div>
                <p>Vehicle: {veh_info}</p>
                <p>VIN: {veh_vin}</p>
                <p>Repo Company: {repo_company}</p>
                <p>Repod On: {repod_on}</p>
            </div>
        </div>
    )
}

export default AuctionInfoHeader;