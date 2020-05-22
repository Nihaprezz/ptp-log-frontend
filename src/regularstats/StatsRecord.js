import React from "react";

const StatsRecord = (props) => {
    let { cuname, ptpPromised, ptpCollected, ptpTotal, ptpBroken } = props.dataObj

    let amtsCollected = (ptpCollected/ptpPromised) * 100; //percent of $ collected
    let amtsOfBrokenPtps = (ptpBroken/ ptpTotal) * 100;   //percent of broken ptps

    return (
        <tr>
            <td>{cuname}</td>
            <td>{ptpTotal}</td>
            <td>{ptpBroken}</td>
            <td>{ptpPromised ? `$ ${ptpPromised.toFixed(2)}` : 0}</td>
            <td>{ptpCollected ? `$ ${ptpCollected.toFixed(2)}` : 0}</td>
            <td>{amtsCollected ? `${amtsCollected.toFixed(2)}%` : '0%'}</td>
            <td>{amtsOfBrokenPtps ? `${amtsOfBrokenPtps.toFixed(2)}%` : '0%'}</td>
        </tr>
    )
}

export default StatsRecord;