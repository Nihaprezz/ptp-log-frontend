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
            <div className="results-auction-section">
                <h3 class="ui dividing header">Auction Information</h3>

                <div>
                    <p> Auction: <span>{auction_name}</span></p>
                    <p> Transport Date: <span>{transport_date}</span></p>
                    <p> In Transit: <span>{in_transit ? 'Yes' : 'No, Arrived at Auction.'}</span></p>
                    <p> Floor: <span>{floor ? floor : 'TBD'}</span></p>
                    <p> Sale Date: <span>{sale_date ? sale_date : 'TBD'}</span></p>   
                </div>
                
                <div>
                    {/* IF VEHICLE IS  ARCHIVED THEN DO NOT SHOW EDIT FOR AUCTION BUTTON 
                    ELSE SHOW EDIT FOR AUCTION. EVEN IF CLOSE ITS FINE TO UPDATE.*/}
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
            <div className="results-sold-section">
                <h3 class="ui dividing header">Sold Information</h3>
                
                <div>
                    <p>Sold Amt: {sold_amt}</p>
                    <p>Sale Location: {sale_location}</p>
                    <p>CU Check Sent: {cu_check_sent ? 'Yes' : 'No'}</p>
                    <p>Deficiency Amount: {deficiency_amt ? deficiency_amt : 'TBD'}</p>
                    <p>Deficiency Ltr Sent: {deficiency_sent ? 'Yes' : 'No'}</p>  
                </div>
                
                <div>
                    {/* IF VEHICLE IS ARCHIVED THEN DO NOT SHOW EDIT FOR AUCTION
                    ELSE SHOW AUCTION BUTTON */}
                    <p>{`button will go here to edit if it hasnt been archived yet ${id}`}</p>
                </div>
            </div>

        )
    }

    //HTML Element for repo edit button
    let repoEditBtn;
    if(archive_record || !closed_repo){
        repoEditBtn = <button className="ui button">Edit</button>
    }

    return (
        <div className="ui segment results-card-container">
            <div className="results-repo-section">
                <h3 class="ui dividing header">Repo Information</h3>

                <div className='results-repo-main-section'>
                    <p>Acct No: <span>{acct_no}</span></p>
                    <p>Credit Union: <span>{cuName}</span></p>
                    <p>Member Name: <span>{`${first_name} ${last_name}`}</span></p>
                    <p>Repo Company: <span>{repo_company}</span></p>
                    <p>Placed Out On: <span>{created_on}</span></p>
                    <p>Vehicle: <span>{veh_info}</span></p>
                    <p>VIN: <span>{veh_vin}</span></p>
                    <p>Repo'd: <span>{repod ? `Repod on ${repod_on}`: 'No'}</span></p>
                    <p>Repo On Hold: <span>{hold_order ? 'Yes': 'No'}</span></p>
                    <p>Archived Record: <span>{archive_record ? 'Yes': 'No'}</span></p>
                </div>
                
                {closed_reason ? (
                    <div className="results-repo-closed-section">
                        <p>Repo Closed : <span>Yes</span></p>
                        <p>Reason For Closed: <span>{closed_reason}</span></p>
                    </div>
                ) : null}

                {/* IF VEHICLE IS ARCHIVED OR IF VEHICLE IS CLOSED DO NOT SHOW EDIT FOR REPO */}
                {repoEditBtn}
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