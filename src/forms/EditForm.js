import React from "react"

class EditForm extends React.Component {
    constructor(){
        super();

        this.state = {
            username: "", 
            password: "", 
            isadmin: false,
            editState: false,
        }
    }

    // componentDidMount(){
    //     this.setState({username: this.props.userObj.username, isadmin: this.props.userObj.isadmin})
    // }

    render(){
        console.log(this.state)
        console.log(this.props)

        let {username, isadmin} = this.props.userObj

        return (
            
            <div>
                <h1>Edit User: {username}</h1>
                <form className="ui form">
                    <div className="field">
                        <label>Username</label>
                        <input type="text" name="username" placeholder={username}/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password"/>
                    </div>
                    <div className="field">
                        <div className="">
                        <input type="checkbox" tabIndex="0"/>
                        <label>Admin</label>
                        </div>
                    </div>
                    <button className="ui button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default EditForm