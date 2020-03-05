import React from "react";
import NewCU from "../forms/NewCU";
import CreditUnionTable from "./CreditUnionTable"

class CreditUnionContainer extends React.Component {
    state = {
        showForm: false,
    }

    toggleForm = () => {
        this.setState({showForm : !this.state.showForm})
    }

    render() {
        console.log(this.props.allCUs)
        return(
            <div>
                <button className="ui green button" onClick={this.toggleForm}>Add New Credit Union</button>
                {this.state.showForm ? < NewCU closeForm={this.toggleForm}/> : < CreditUnionTable allCUs={this.props.allCUs}/>}
            </div> 
        )
    }
}

export default CreditUnionContainer