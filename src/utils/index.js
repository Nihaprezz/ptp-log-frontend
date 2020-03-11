import SimpleCrypto from "simple-crypto-js"

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

//ENCRYPT AND DECRYPT
const _secretKey = process.env.REACT_APP_SECRET_KEY

function encryptSSN(ssn){
    var simpleCrypto = new SimpleCrypto(_secretKey);
    var encryptData = ssn;
    var cipherText = simpleCrypto.encrypt(encryptData);
    return cipherText
}

function decipherSSN(cipherText){
    var simpleCrypto = new SimpleCrypto(_secretKey);
    var decipherText = simpleCrypto.decrypt(cipherText);
    return decipherText
}

export { getMonth, monthNames, validatePTP, encryptSSN, decipherSSN };