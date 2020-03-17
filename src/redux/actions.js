import Swal from "sweetalert2"

const HOST_URL = process.env.REACT_APP_BACKEND

function setCurrentUser(user) {
    return {type: "CURRENT_USER", payload: user}
}

function logIn(userInfo) {
    return (dispatch) => {
        fetch(HOST_URL + `api/v1/login`, {
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
            fetch(HOST_URL + `api/v1/profile`, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`, 
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json'
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


//FETCHING THE CU NAMES FROM THE BACKEND
function setAllCUs(cuData){
    return {type: 'SET_ALL_CU', payload: cuData}
}
 
function getAllCUs(){
    return (dispatch => {
        fetch(HOST_URL + 'creditunions',{
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
          })
          .then(resp => resp.json())
          .then(data => {
            if(data.message){
              alert(data.message)
            } else {
              dispatch(setAllCUs(data))
            }
        })
    })
}

function addNewCU(creditunion){
    return {type: 'ADD_NEW_CU', payload: creditunion}
}

function addingNewCU(creditUnion){
    return (dispatch => {
        fetch(HOST_URL + 'creditunions', {
            method: 'POST', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                creditUnion: creditUnion
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.message){
                Swal.fire('Error', `${data.message}`, 'warning')
            } else {
                Swal.fire('Added', `${data.name} has been added!`, 'success')
                dispatch(addNewCU(data))
            }
        })
    })
}

export { checkUser, logIn, signOut, getAllCUs, addingNewCU}