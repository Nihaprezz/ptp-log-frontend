import React from "react"

const RegularSearchResults  = (props) => {
    //Initial Repo Object deconstructing
    let {id, acct_no, archive_record, closed_reason, closed_repo, created_on, first_name, hold_order, 
    last_name, repo_company, repod, repod_on, veh_info, veh_vin } = props.repoObj;
    
    //Checking to see if the CU is still available and not deleted.
    let cuName; 
    props.repoObj.creditunion ? cuName = props.repoObj.creditunion.name : cuName = 'CU Deleted'
    
    //Auction Info rendering if there is any auction info
    let auctionInfo;
    if(props.repoObj.auction_record){
        let { auction_name, floor, id, in_transit, sale_date, sold, transport_date } = props.repoObj.auction_record;

        auctionInfo = (
            <div>
                <p> Auction: {auction_name}</p>
                <p> Transport Date: {transport_date}</p>
                <p> In Transit: {in_transit ? 'Yes' : 'No, Arrived at Auction.'}</p>
                <p> Floor: {floor ? floor : 'TBD'}</p>
                <p> Sale Date: {sale_date ? sale_date : 'TBD'}</p>
                <div>
                    {sold ? `Button to Sold Edit record will be here ${id}` : 'else button to auction edit record'}
                </div>
            </div>
        )
    }

    //Sold Info rendering if there is any sold info to show
    let soldInfo;
    if(props.repoObj.sold_record){
        let { cu_check_sent, deficiency_amt, deficiency_sent, id, sale_location, sold_amt} = props.repoObj.sold_record;

        soldInfo = (
            <div>
                <p>Sold Amt: {sold_amt}</p>
                <p>Sale Location: {sale_location}</p>
                <p>CU Check Sent: {cu_check_sent ? 'Yes' : 'No'}</p>
                <p>Deficiency Amount: {deficiency_amt ? deficiency_amt : 'TBD'}</p>
                <p>Deficiency Ltr Sent: {deficiency_sent ? 'Yes' : 'No'}</p>
                <p>Archived Record: {archive_record ? 'Yes': 'No'}</p>
                <div>
                    <p>{`button will go here to edit if it hasnt been archived yet ${id}`}</p>
                </div>
            </div>

        )
    }

    return (
        <div className="ui segment results-card-container">
            <div className="results-repo-section">
                <p>Acct No: <span>{acct_no}</span></p>
                <p>Credit Union: <span>{cuName}</span></p>
                <p>Member Name: <span>{`${first_name} ${last_name}`}</span></p>
                <p>Repo Company: <span>{repo_company}</span></p>
                <p>Placed Out On: <span>{created_on}</span></p>
                <p>Vehicle: <span>{veh_info}</span></p>
                <p>VIN: <span>{veh_vin}</span></p>
                <p>Repo'd: {repod ? `Yes, Repod on ${repod_on}`: 'No'}</p>
                <p>Repo On Hold: {hold_order ? 'Yes': 'No'}</p>
                <div>
                    {!repod ? `Show button to edit out for repo ${id}`: null}
                </div>

                <div>
                    {closed_repo ? <p> Repo Closed : {closed_reason}</p> : null}
                </div>
            </div>

            {props.repoObj.auction_record ? (
                auctionInfo
            ): <h3>No Auction Info</h3>}

            {props.repoObj.sold_record ? (
                soldInfo
            ): <h3>No Sold Info</h3>}
        </div>
    )
}

export default RegularSearchResults;