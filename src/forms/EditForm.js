import React from "react"
import Swal from "sweetalert2"

class EditForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "", 
            password: "", 
            isadmin: props.userObj.isadmin,
        }
    }

    handleUncheck = (e) => {
        this.setState({isadmin: e.currentTarget.checked})
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkSubmit = (e) => {
        e.preventDefault();
        let userName, admin = this.state.isadmin;
        this.state.username === "" ? userName = this.props.userObj.username : userName = this.state.username

        let updatedUser = {id: this.props.userObj.id, user: userName, password: this.state.password, isadmin: admin}

        if (this.state.password === ""){
            Swal.fire('Password!', 'Password field cannot be empty!', 'warning')
        } else if (this.state.isadmin){
            Swal.fire({
                title: 'Are you sure?',
                text: 'User will have Admin Privileges', 
                icon: 'warning', 
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if(result.value){
                    this.props.update(updatedUser)
                }
            })
        } else {
            this.props.update(updatedUser)
        }

        this.setState({username: "", password: ""})

    }

    render(){
        let { username } = this.props.userObj
        console.log(this.state)
        return (
            
            <div className="user-edit-form-container">
                <h1><i class="id card icon"></i> Edit User: {username}</h1> 

                <form className="ui form ">
                    <div className="field">
                        <label>Username</label>
                        <input onChange={(e) => this.handleChange(e)}
                        type="text" name="username" placeholder={username} value={this.state.username}/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input onChange={(e) => this.handleChange(e)}
                         type="password" name="password" placeholder="Password" value={this.state.password}/>
                    </div>

                    <div className="field">
                        <label>Admin</label>
                        <input 
                        type="checkbox" checked={this.state.isadmin} onChange={(e) => this.handleUncheck(e)}/>
                    </div>   

                    <div>
                        <button className="ui button green" type="submit" onClick={(e) => this.checkSubmit(e)}
                        >Save</button> 
                        <p className="ui button" onClick={() => this.props.toggleForm()}> Cancel </p>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditForm