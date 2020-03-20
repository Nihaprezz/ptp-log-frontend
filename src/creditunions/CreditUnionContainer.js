import React from "react";
import NewCU from "../forms/NewCU";
import CreditUnionTable from "./CreditUnionTable"
import { connect } from "react-redux"
import { deleteCU } from "../redux/actions"

class CreditUnionContainer extends React.Component {
    state = {
        showForm: false,
    }

    toggleForm = () => {
        this.setState({showForm : !this.state.showForm})
    }

    deleteCU = (cu) => {
        this.props.deleteCU(cu)
    }

    render() {
        console.log(this.props.allCUs)
        return(
            <div>
                <button className="ui green button" onClick={this.toggleForm}>Add New Credit Union</button>

                {this.state.showForm ? < NewCU closeForm={this.toggleForm}/> : (
                    < CreditUnionTable allCUs={this.props.allCUs} deleteCU={this.deleteCU}/>
                )}
            </div> 
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCU: (cu) => {dispatch(deleteCU(cu))}
    }
}

export default connect(null, mapDispatchToProps)(CreditUnionContainer);