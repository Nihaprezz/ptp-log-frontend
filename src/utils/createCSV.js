// import { daysInBetween } from "./index"

function dataToCsv(json){
    const data = json.map(row => ({
        'Acct No': row.acct_no,
        'Credit Union': row.creditunion.name,
        'Member Name': row.first_name + " " + row.last_name, 
        'Vehicle': row.veh_info, 
        'VIN': row.veh_vin,
        'Placed Out On': row.created_on,
        'Days Out': '',
        'Time Checked': '',
        'Delinquent Amount': ''
    }));

    const csvData = objectToCsv(data)
    // console.log(csvData)
    download(csvData)
}

function objectToCsv(data){
    const csvRows = [];

    //get the headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    //loop over the rows
    for (const row of data){
        const values = headers.map(header => {
            const escaped = (''+ row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`
        })

        csvRows.push(values.join(','))
    }

    return csvRows.join('\n')
}

function download(data){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    const blob = new Blob ([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `Out For Repo-${today}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export { dataToCsv }