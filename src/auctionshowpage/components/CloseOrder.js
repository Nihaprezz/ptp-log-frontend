import React from "react";
import { Link } from "react-router-dom"

const CloseOrder = (props) => {
    return (
        <div className="recovery-record-form-conts">
            <form className="ui form">
                <div className="field recovery-record-btns-cont">
                    <button className="ui red button close-repo-btn" onClick={(e) => this.getCloseReason(e)}>
                        Close Repo
                    </button>

                    < Link className="ui button back-repo-btn" to={{pathname: `/auction`, state: {showAuction: true}}} > 
                        Back 
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default CloseOrder;

