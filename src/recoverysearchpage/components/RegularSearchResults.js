import React, { useState } from "react"
import { Link } from "react-router-dom"

const RegularSearchResults  = (props) => {
    //toggle states
    const [toggleAuction, SetToggleAuction] = useState(false)
    const [toggleSold, SetToggleSold] = useState(false)

    //toggle functions
    const showAuction = () => SetToggleAuction(!toggleAuction);
    const showSold = () => SetToggleSold(!toggleSold);

    //Initial Repo Object deconstructing
    let {id, acct_no, archive_record, closed_reason, closed_repo, created_on, first_name, hold_order, 
    last_name, repo_company, repod, repod_on, veh_info, veh_vin } = props.repoObj;
    
    //Renaming repo ID
    const mainID = id;

    //Checking to see if the CU is still available and not deleted.
    let cuName; 
    props.repoObj.creditunion ? cuName = props.repoObj.creditunion.name : cuName = 'CU Deleted'
    
    //Auction Info rendering if there is any auction info
    let auctionInfo;
    if(props.repoObj.auction_record){
        let { auction_name, floor, in_transit, sale_date, transport_date } = props.repoObj.auction_record;

        auctionInfo = (
            <div className="results-auction-section">
                <h3 id="results-toggle" className="ui dividing header" onClick={() => showAuction()}>
                    Auction Information
                    {toggleAuction ? <i className="caret down icon"></i> : <i className="caret right icon"></i>}
                </h3>

                <div style={{display: toggleAuction ? 'grid' : 'none'}}>
                    <p> Auction: <span>{auction_name}</span></p>
                    <p> Transport Date: <span>{transport_date}</span></p>
                    <p> In Transit: <span>{in_transit ? 'Yes' : 'No, Arrived at Auction.'}</span></p>
                    <p> Floor: <span>{floor ? '$' + floor.toLocaleString() : 'TBD'}</span></p>
                    <p> Sale Date: <span>{sale_date ? sale_date : 'TBD'}</span></p>   
                </div>
                
                <div style={{display: toggleAuction ? 'block' : 'none'}}>
                    {/* IF VEHICLE IS  ARCHIVED THEN DO NOT SHOW EDIT FOR AUCTION BUTTON 
                    ELSE SHOW EDIT FOR AUCTION. EVEN IF CLOSE ITS FINE TO UPDATE.*/}
                    {!archive_record ? <Link to={`/auction_record/${mainID}`} className="ui button">Edit</Link> : null}
                </div>
            </div>
        )
    }

    //Sold Info rendering if there is any sold info to show
    let soldInfo;
    if(props.repoObj.sold_record){
        let { cu_check_sent, deficiency_amt, deficiency_sent, sale_location, sold_amt} = props.repoObj.sold_record;

        soldInfo = (
            <div className="results-sold-section">
                <h3 id="results-toggle" className="ui dividing header" onClick={() => showSold()}>
                    Sold Information
                    {toggleSold ? <i className="caret down icon"></i> : <i className="caret right icon"></i>}
                </h3>
                
                <div style={{display: toggleSold ? 'grid' : 'none'}}>
                    <p>Sold Amt: <span>{sold_amt ? '$' + sold_amt.toLocaleString() : 'TBD'}</span></p>
                    <p>Sale Location: <span>{sale_location}</span></p>
                    <p>CU Check Sent: <span>{cu_check_sent ? 'Yes' : 'No'}</span></p>
                    <p>Deficiency Amount: <span>{deficiency_amt ? '$' + deficiency_amt.toLocaleString() : 'TBD'}</span></p>
                    <p>Deficiency Ltr Sent: <span>{deficiency_sent ? 'Yes' : 'No'}</span></p>  
                </div>
                
                <div style={{display: toggleSold ? 'block' : 'none'}}>
                    {/* IF VEHICLE IS ARCHIVED THEN DO NOT SHOW EDIT FOR AUCTION
                    ELSE SHOW AUCTION BUTTON */}
                    {!archive_record ? <Link to={`/sold_record/${mainID}`} className="ui button">Edit</Link> : null}
                </div>
            </div>

        )
    }

    //HTML Element for repo edit button
    const showRepoEdit = () => {
        let repoEditBtn;
        if(archive_record || closed_repo){
            repoEditBtn = <h4 style={{textDecoration: 'underline'}}>Unable to Edit Due to being Archived or Closed</h4>
        } else {
            repoEditBtn = <Link to={`/repo_record/${mainID}`} className="ui button">Edit</Link>
        } 
        return repoEditBtn
    }

    return (
        <div className="ui segment results-card-container">
            <div className="results-repo-section">
                <h3 className="ui dividing header">Repo Information</h3>

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
                {showRepoEdit()}
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