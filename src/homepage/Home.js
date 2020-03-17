import React from "react"
import PTPContainer from "../promisetopay/PTPContainer"


const Home = (props) => {
    return (
        <div> 
            <h4> Logged in as: {props.user.username}</h4>
            < PTPContainer userid={props.user.id} allCUs={props.allCUs}/>
        </div>
    )
}




export default Home;