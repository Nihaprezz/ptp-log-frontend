import React from "react";
import RegularSearch from "./containers/RegularSearch"
import "./recovery_search.css"

class RecoverySearch extends React.Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return (
            <div>
                <div className="recovery-search-button-cont">
                    <button className="ui secondary button">Other Search</button>   
                </div>

                <RegularSearch/>
            </div>
        )
    }
}

export default RecoverySearch;