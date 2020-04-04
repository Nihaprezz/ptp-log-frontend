import React from "react";

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

    render(){
        console.log(this.state)
        return (
            <div>
                This be the auction page
                {/* RECORD DETAIL HEADER */}
                {/* UPDATE AUCTION FORM SECTION */}
                {/* SOLD AUCTION FORM SECTION */}
                {/* CLOSE REPO SECTION WITH A REASON WHY */}
            </div>
        )
    }
}

export default AuctionShowPage;