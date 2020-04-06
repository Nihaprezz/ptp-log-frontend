import React from "react";

const SoldInfoHeader = (props) => {
    let {acct_no, first_name, last_name, repod_on, repo_company } = props.soldRecord;
    let {sale_location, sold_amt} = props.soldRecord.sold_record;
    let name;
    props.soldRecord.creditunion ? name = props.soldRecord.creditunion.name : name = "CU Deleted"
    console.log(props)
    return (
        <div className="repo-order-details-cont">
            <div>
                <p>Acct No: {acct_no}</p>
                <p>Credit Union: {name}</p>
                <p>Member Name : {`${first_name} ${last_name}`}</p>
                <p>Transport Date: {repod_on}</p>
            </div>

            <div>
                <p>Repo Company: {repo_company}</p>
                <p>Sale Location: {sale_location}</p>
                <p>Sold Amt: {sold_amt}</p>
            </div>
        </div>   
    )
}

export default SoldInfoHeader;