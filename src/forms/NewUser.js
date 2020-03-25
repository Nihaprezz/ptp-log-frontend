import React from "react";
import Swal from "sweetalert2"

class NewUser extends React.Component {
    constructor(){
        super();

        this.state = {
            username:"", 
            password: "", 
            isadmin: false,
            isrecovery: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleCheckbox = (e) => {
        this.setState({
            [e.target.name]: e.currentTarget.checked
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        let userInfo = this.state

        if(this.state.username === "" || this.state.password === ""){
            Swal.fire('Error', 'Make sure all fields are filled.', 'warning')
        } else {
            this.props.submitUser(userInfo)
            this.setState({username: "", password: "", isadmin: false, isrecovery: false})
        }
        
    }

    render(){
        return (
            <div className="user-edit-form-container" >
            <h1> <i className="user icon"></i> New User</h1>
            <form className="ui form">
                <div className="field">
                    <label>Username</label>
                    <input onChange ={(e) => this.handleChange(e)}
                    type="text" name="username" placeholder="Password" value={this.state.username} required/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input onChange ={(e) => this.handleChange(e)}
                    type="password" name="password" placeholder="Password" value={this.state.password} required/>
                </div>
                
                <div className="two fields">
                    <div className="field">
                        <label>Admin</label>
                        <input onChange ={(e) => this.handleCheckbox(e)}
                        type="checkbox" name="isadmin" value={this.state.isadmin}/>
                    </div>   

                    <div className="field">
                        <label>Recovery</label>
                        <input onChange ={(e) => this.handleCheckbox(e)}
                        type="checkbox" name="isrecovery" value={this.state.isrecovery}/>
                    </div> 
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