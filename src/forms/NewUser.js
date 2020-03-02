import React from "react";

class NewUser extends React.Component {
    constructor(){
        super();

        this.state = {
            username:"", 
            password: "", 
            isadmin: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleCheckbox = (e) => {
        this.setState({isadmin: e.currentTarget.checked})
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.submitUser(this.state)
        this.setState({username: "", password: "", isadmin: false})
    }

    render(){
        return (
            <div >
            <h1>New User</h1>
            <form className="ui form card">
                <div className="field">
                    <label>Username</label>
                    <input onChange ={(e) => this.handleChange(e)}
                    type="text" name="username" placeholder="Password" value={this.state.username}/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input onChange ={(e) => this.handleChange(e)}
                    type="password" name="password" placeholder="Password" value={this.state.password}/>
                </div>

                <div className="field">
                    <label>Admin</label>
                    <input onChange ={(e) => this.handleCheckbox(e)}
                    type="checkbox" name="isadmin"/>
                </div>   


                <div>
                    <button className="ui button" type="submit" onClick={(e) => this.onSubmit(e)}>Submit</button> 
                </div>
            </form>
        </div>
        )
    }
}

export default NewUser