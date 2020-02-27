import React from "react"
import Navbar from "./Navbar"
import PTPContainer from "../promisetopay/PTPContainer"
import { signOut } from "../redux/actions"
import { connect } from "react-redux"

const Home = (props) => {
    const signOut = () => {
        console.log('attempting to sign out')
        props.signOut()
    }

    return (
        
        <div> 
            < Navbar signOut={signOut} user={props.user}/>
            <h1> Welcome {props.user.username}!</h1>
            < PTPContainer />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {dispatch(signOut())}
    }
}


export default connect(null, mapDispatchToProps)(Home);