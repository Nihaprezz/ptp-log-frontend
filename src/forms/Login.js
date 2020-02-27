import React from "react";
import { connect } from "react-redux";
import { logIn } from "../redux/actions"
import "./form.css"

class Login extends React.Component {
    constructor(){
        super();

        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.logIn(this.state)
    }

    render(){
        return (
            <div>
                <div className="login-container">
                    <form className="ui form" onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="field">
                            <label>Username</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" name="username" placeholder="Username"/>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" name="password" placeholder="Password"/>
                        </div>

                        <button className="ui button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logIn: (info) => {dispatch(logIn(info))}
})

export default connect(null, mapDispatchToProps)(Login)