import React from "react";
import { connect } from "react-redux";
import { logIn, getAllCUs } from "../redux/actions"
import "./form.css"

class Login extends React.Component {
    constructor(){
        super();

        this.state = {
            username: "",
            password: ""
        }
    }

    componentDidMount(){
        this.props.getAllCUs()
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
                <div className="form-container">
                    <form className="ui form" onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="field">
                            <label>Username</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="text" name="username" placeholder="Username"/>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input onChange={(e) => this.handleChange(e)}
                            type="password" name="password" placeholder="Password"/>
                        </div>

                        <button className="ui button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logIn: (info) => {dispatch(logIn(info))}, 
    getAllCUs: () => {dispatch(getAllCUs())}
})

export default connect(null, mapDispatchToProps)(Login)