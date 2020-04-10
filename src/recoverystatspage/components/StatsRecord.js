import React from "react"

const StatsRecord = (props) => {
    let { cuname, total_out, total_repod, total_sold } = props.cuObj
    let repodPercentage = (total_repod/total_out) * 100
    let soldPercentage = (total_sold/total_out) * 100

    if(repodPercentage === Infinity) repodPercentage = 0;
    if(soldPercentage === Infinity) soldPercentage = 0;

    return (
        <tr>
            {cuname ? <td>{cuname}</td> : null}
            <td>{total_out}</td>
            <td>{total_repod}</td>
            <td>{total_sold}</td>
            <td>{repodPercentage ? repodPercentage.toFixed(2) + '%' : '0%'}</td>
            <td>{soldPercentage ? soldPercentage.toFixed(2) + '%' : '0%'}</td>
        </tr>
    )
}

export default StatsRecord