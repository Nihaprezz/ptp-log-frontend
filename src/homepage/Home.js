import React from "react"
import PTPContainer from "../promisetopay/PTPContainer"


const Home = (props) => {
    return (
        <div> 
            <h1> Welcome {props.user.username}!</h1>
            < PTPContainer />
        </div>
    )
}




export default Home;