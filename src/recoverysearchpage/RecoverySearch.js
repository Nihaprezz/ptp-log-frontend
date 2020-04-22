import React from "react";
import RegularSearch from "./containers/RegularSearch"
import AdvancedSearch from "./containers/Advanced Search"
import "./recovery_search.css"

class RecoverySearch extends React.Component {
    constructor(){
        super();

        this.state = {
            otherSearch: false
        }
    }

    changeSearch = (status) => {
        this.setState({otherSearch: status})
    }

    render(){
        let { otherSearch } = this.state;

        return (
            <div>
                <div className="recovery-search-button-cont">
                    {otherSearch ? (
                        <button onClick={() => this.changeSearch(false)}
                        className="ui secondary button">Regular Search</button>  
                    ):(
                        <button onClick={() => this.changeSearch(true)}
                        className="ui secondary button">Other Search</button>  
                    )}
                </div>

                {otherSearch ? <AdvancedSearch allCUs={this.props.allCUs}/> : <RegularSearch/>}
            </div>
        )
    }
}

export default RecoverySearch;