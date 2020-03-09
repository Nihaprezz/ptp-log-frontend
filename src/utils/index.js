//HELPER TO GET CURRENT MONTH
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
]

function getMonth(){
    const d = new Date();
    return monthNames[d.getMonth()]
}

export { getMonth, monthNames };