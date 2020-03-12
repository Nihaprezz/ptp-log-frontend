import React from "react";
import SkipRecords from "./SkipRecords"

const SkipTraceTable = (props) => {
    let header = props.skipType.charAt(0).toUpperCase() + props.skipType.slice(1)

    return (
        <div>
            <h1 className="skip-table-hdr">{header} Skip Records</h1>

            <div className="skip-trace-table">
                {props.skipData.length === 0 ? (
                    <h3>Loading....</h3>
                ): (
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Account No</th>
                            <th>Credit Union</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date Submitted</th>
                            {props.skipType === "returned" ? <th>Results</th> : null}
                        </tr>   
                    </thead>
                    <tbody>
                        {props.skipData.message ? (
                            <tr><td>{props.skipData.message}</td></tr>
                        ): (
                            props.skipData.map(skip => {
                                return < SkipRecords key={skip.id} skipObj={skip} />
                            })
                        )}
                    </tbody>
                </table>
                )}
            </div>
        </div>
    )
}

export default SkipTraceTable;