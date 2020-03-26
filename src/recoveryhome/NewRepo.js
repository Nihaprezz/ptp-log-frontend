import React from "react";

class NewRepo extends React.Component {
    constructor(){
        super();

        this.state = {
            
        }
    }

    render(){
        return (
            <div className="new-repo-form">
                <form className="ui form">

                    <div className="two fields">
                        <div className="field">
                            <label>Acct Number</label>
                            <input type="text"/>
                        </div>

                        <div className="field">
                            <label>Credit Union</label>
                            <select className="ui fluid dropdown">
                                {this.props.allCUs.map(cu => {
                                    return <option key={cu.id}>{cu.name}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="two fields">
                        <div className="field">
                            <label>First Name</label>
                            <input type="text"/>
                        </div>

                        <div className="field">
                            <label>Last Name</label>
                            <input type="text"/>
                        </div>
                    </div>

                    <h4 className="ui dividing header">Vehicle Information</h4>

                    <div className="three fields">
                        <div className="field">
                            <label>Make</label>
                            <input type="text"/>
                        </div>

                        <div className="field">
                            <label>Model</label>
                            <input type="text"/>
                        </div>

                        <div className="field">
                            <label>Vin</label>
                            <input type="text"/>
                        </div>
                    </div>

                    <div className="two fields">
                        <div className="field">
                            <label>Repo Company</label>
                            <input type="text"/>
                        </div>

                        <div className="field">
                            <label>Recovery Specialist</label>
                            <select className="ui fluid dropdown">
                                {this.props.recoveryUsers.map(user => {
                                    return <option key={user.id}>{user.username}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="field">
                        <label>Comments</label>
                        <textarea />
                    </div>

                    <div className="new-repo-btns">
                        <button className="ui secondary button">Submit</button>
                        <button className="ui button">Cancel</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default NewRepo