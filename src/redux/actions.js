
function setCurrentUser(user) {
    return {type: "CURRENT_USER", payload: user}
}

function checkUser(){
    if (localStorage.getItem('jwt')){
        return (dispatch) => {
            fetch(`${HOST_URL}/api/v1/profile`, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then(res => res.json())
            .then(user => {
                dispatch(setCurrentUser(user.user))
            })
        }
    }
}

export { checkUser }