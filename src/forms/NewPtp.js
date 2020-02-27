import React from "react";

class NewPtp extends React.Component {

    render(){
        return (
            <div>
                <form className="ui form">
                    <h4 className="ui dividing header">Enter PTP Info</h4>
                    <div className="fields">
                        <div className="field">
                            <label>Account Number</label>
                            <input type="text" placeholder="First Name"/>
                        </div>

                        <div className="field">
                            <label>Credit Union</label>
                            <input type="text" placeholder="Middle Name"/>
                        </div>
                    </div>

                    <div class="field">
                        <label>Name</label>
                        <div class="two fields">
                        <div class="field">
                            <input type="text" name="shipping[first-name]" placeholder="First Name"/>
                        </div>
                        <div class="field">
                            <input type="text" name="shipping[last-name]" placeholder="Last Name"/>
                        </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewPtp