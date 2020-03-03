import React from "react"
import PTPContainer from "../promisetopay/PTPContainer"


const Home = (props) => {
    return (
        <div> 
            <h1> Welcome {props.user.username}!</h1>
            < PTPContainer userid={props.user.id}/>
        </div>
    )
}




export default Home;