import React from "react";
import FilterBar from "./FilterBar"

class PTPManager extends React.Component {
    constructor(){
        super();

        this.state = {
            searchType: "user", 
            user: "", 
            showClosed: false, 
            creditunion: "",
            startDate: "", 
            endDate: "",
        }
    }
    

    changeSearchType = (type) => {
        this.setState({searchType: type})
    }

    render(){
        return (
            <div>
                <br></br>
                <h3>Search By: </h3>
                <div id="search-by-bar" className="ui two item menu">
                    {/* eslint-disable-next-line*/}
                    <a className="item" onClick={() => this.changeSearchType('user')}>User</a>
                    {/* eslint-disable-next-line*/}
                    <a className="item" onClick={() => this.changeSearchType('creditunion')}>Credit Union</a>
                </div>

                < FilterBar searchType={this.state.searchType}/>
                

            </div>
        )
    }
}

export default PTPManager