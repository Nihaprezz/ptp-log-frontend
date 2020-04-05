import React from "react";
import AuctionInfoHeader from "./components/AuctionInfoHeader"
import UpdateAuction from "./components/UpdateAuction"
import UpdateSold from "./components/UpdateSold"
import CloseOrder from "./components/CloseOrder"

const backend_url = process.env.REACT_APP_BACKEND

class AuctionShowPage extends React.Component {
    constructor(){
        super();

        this.state = {
            showRecord: []
        }
    }

    componentDidMount(){
        let id = this.props.auctionID
        fetch(backend_url + `auction_records/${id}`,{
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(record => this.setState({showRecord: record}))
        .catch(err => alert(err))
    }

    updatedRecord = (updatedRecord) => {
        this.setState(updatedRecord)
    }

    render(){
        let { showRecord } = this.state

        return (
            <div className="recovery-record-cont ui card">

                {this.state.showRecord.length === 0 ? <h2> Loading... </h2> : (
                    <React.Fragment>
                        < AuctionInfoHeader record={showRecord}/>
                    
                    {/* UPDATE AUCTION FORM SECTION */}
                        < UpdateAuction record={showRecord} update={this.updatedRecord}/>
                    {/* SOLD AUCTION FORM SECTION */}
                        < UpdateSold record={showRecord} />
                    {/* CLOSE REPO SECTION WITH A REASON WHY */}
                        < CloseOrder record={showRecord}/>
                    </React.Fragment>
                )}
            </div>
        )
    }
}

export default AuctionShowPage;