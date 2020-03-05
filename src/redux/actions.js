const HOST_URL = `http://localhost:3001/`

function setCurrentUser(user) {
    return {type: "CURRENT_USER", payload: user}
}

function logIn(userInfo) {
    return (dispatch) => {
        fetch(`${HOST_URL}/api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: userInfo.username, 
                    password: userInfo.password
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.user){
                dispatch(setCurrentUser(data.user));
                localStorage.setItem("jwt", data.jwt) 
            } else {
                alert(data.message)
            }
        })
    }
}

function checkUser(){
        return (dispatch) => {
            fetch(`${HOST_URL}/api/v1/profile`, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.user){
                    dispatch(setCurrentUser(data.user)) 
                } else {
                    alert('error : unable to retrieve info')
                }
            })
        }
}

function signOut(){
    localStorage.removeItem('jwt')
    return {type: "SIGN_OUT", payload: []} 
}


//FETCHING PTP DATA FROM BACKEND
function setPTPDate(data){
    return {type: "FETCHED_PTP_DATA", payload: data}
}

function fetchPTPData(type){
    debugger
    return (dispatch) => {
        fetch(HOST_URL + `/promisetopays/categeory/${type}`,{
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json' 
            }
        })
        .then(resp => resp.json())
        .then(data => {
            dispatch(setPTPDate(data))
        })
    }
}


export { checkUser, logIn, signOut, fetchPTPData}