import React from "react";

const SkipStatRecord = (props) => {
    let {cuname, skipsFound, skipTotalClosed, skipTotal} = props.dataObj
    let percentage = (skipsFound/skipTotal) * 100

    if(percentage === Infinity){ //some case came up where percentage was infinity..reset to 0
        percentage = 0;
    }

    return (
        <tr>
            <td>{cuname}</td>
            <td>{skipTotal}</td>
            <td>{skipTotalClosed}</td>
            <td>{skipsFound}</td>
            <td>{percentage ? `${percentage.toFixed(2)}%` : `0%`}</td>
        </tr>
    )
}

export default SkipStatRecord;