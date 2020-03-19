import React from "react";

const StatsRecord = (props) => {
    let { cuname, ptpPromised, ptpCollected, ptpTotalClosed, ptpTotal } = props.dataObj

    let percentage = (ptpCollected/ptpPromised) * 100

    return (
        <tr>
            <td>{cuname}</td>
            <td>{ptpTotal}</td>
            <td>{ptpTotalClosed}</td>
            <td>{ptpPromised ? `$ ${ptpPromised}` : 0}</td>
            <td>{ptpCollected ? `$ ${ptpCollected.toFixed(2)}` : '0%'}</td>
            <td>{percentage ? `${percentage.toFixed(2)}%` : '0%'}</td>
        </tr>
    )
}

export default StatsRecord;