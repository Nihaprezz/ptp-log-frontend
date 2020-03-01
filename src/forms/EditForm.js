import React from "react"

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
        this.setState({isadmin: !this.state.isadmin})
    }

    render(){


        let {username, isadmin} = this.props.userObj

        return (
            
            <div >
                <h1>Edit User: {username}</h1>
                <form className="ui form card">
                    <div className="field">
                        <label>Username</label>
                        <input type="text" name="username" placeholder={username}/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password"/>
                    </div>

                    <div className="field">
                        <label>Admin</label>
                        <input type="checkbox" checked={this.state.isadmin} onChange={(e) => this.handleUncheck(e)}/>
                    </div>   


                    <div>
                        <button className="ui button green" type="submit">Save</button> 
                        <button className="ui button" onClick={() => this.props.toggleForm()}> Cancel </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditForm