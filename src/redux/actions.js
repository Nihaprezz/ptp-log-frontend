import Swal from "sweetalert2"

const HOST_URL = process.env.REACT_APP_BACKEND

function setCurrentUser(user) {
    return {type: "CURRENT_USER", payload: user}
}

function logIn(userInfo) {
    Swal.showLoading();
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
                Swal.close();
                dispatch(setCurrentUser(data.user));
                localStorage.setItem("jwt", data.jwt) 
            } else {
                Swal.close();
                alert(data.message)
            }
        })
    }
}

function checkUser(){
        Swal.showLoading();
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
                    Swal.close();
                    dispatch(setCurrentUser(data.user)) 
                } else {
                    Swal.close();
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
                let sorted = [...data].sort((a, b) => a.name > b.name ? 1 : -1)
                dispatch(setAllCUs(sorted))
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

//DELETING CU 
function removeCU(cuData){
    return {type: 'DELETE_CU', payload: cuData}
}

function deleteCU(cu){
    return (dispatch => {
        fetch(HOST_URL + `creditunions/${cu}`, {
            method: 'DELETE',
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(deletedCU => {
            if (deletedCU.id){
                dispatch(removeCU(deletedCU))
            } else {
                alert('Unable to delete this time.')
            }
        })
        .catch(err => alert(err))   
    })
 
}

export { checkUser, logIn, signOut, getAllCUs, addingNewCU, deleteCU}