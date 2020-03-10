//HELPER TO GET CURRENT MONTH
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
]

function getMonth(){
    const d = new Date();
    return monthNames[d.getMonth()]
}

//HELPER TO VALIDATE FORM
function validatePTP(accountNo, firstName, lastName, ptpAmt, ptpDate){
    if(accountNo === "" || firstName === ""
    || lastName === "" || ptpAmt === "" || ptpDate === "") {
        return true
    } else {
        return false
    }
}

export { getMonth, monthNames, validatePTP };