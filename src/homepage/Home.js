import React from "react"
import Navbar from "./Navbar"
import { signOut } from "../redux/actions"
import { connect } from "react-redux"

const Home = (props) => {
    const signOut = () => {
        console.log('attempting to sign out')
        props.signOut()
    }

    return (
        
        <div> 
            < Navbar signOut={signOut}/>
            <h1> Welcome {props.user.username}!</h1>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {dispatch(signOut())}
    }
}


export default connect(null, mapDispatchToProps)(Home);