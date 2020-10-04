import React from "react";
import AuctionTable from "./containers/AuctionTable";
import PendingAuctionTable from "./containers/PendingAuctionTable"
import Swal from "sweetalert2"
import { withRouter } from "react-router-dom"

const backend_url = process.env.REACT_APP_BACKEND;

class AuctionPage extends React.Component {
    constructor(){
        super();

        this.state = {
            repoRecords: [],
            auctionRecords: [],
            showAuction: false
        }
    }

    componentDidMount(){
        if(this.props.location.state){
            this.setState({showAuction: true})
        }

        if(this.props.user.isadmin){
            this.getUserPending();
            this.getUserAuction();
        } else {
            this.getAllPending();
            this.getAllAuction();
        }
    }

    validateRecords(records){
        if(records.error){ return records }
        
        const adjustedData = records.map((record) => {
            if(!record.creditunion){
                return {...record, creditunion: {name: 'Invalid CU Name'}};
            } else {
                return record;
            }
        })
        return adjustedData;
    }

    getAllPending(){
        fetch(backend_url + 'auction_records', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(pendingTransport => {
            const validatedData = this.validateRecords(pendingTransport);
            this.setState({repoRecords: validatedData})
        })
    }

    getUserPending(){
        Swal.showLoading()
        let id = this.props.user.id
        fetch(backend_url + `auction_records/user/${id}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(pendingTransport => {
            const validatedData = this.validateRecords(pendingTransport);
            Swal.close()
            this.setState({repoRecords: validatedData})
        })
    }

    getAllAuction = () => {
        fetch(backend_url + 'auction_records/all/at_auction', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(atAuction => {
            const validatedData = this.validateRecords(atAuction);
            this.setState({auctionRecords: validatedData})
        })
        .catch(err => alert(err))
    }

    getUserAuction = () => {
        let id = this.props.user.id
        fetch(backend_url + `auction_records/user/at_auction/${id}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(atAuction => {
            const validatedData = this.validateRecords(atAuction);
            this.setState({auctionRecords: validatedData})
        })
        .catch(err => alert(err))
    }

    toggleTable = (status) => {
        this.setState({showAuction: status}, () => {
            if(status && this.state.auctionRecords.length === 0){
                this.setState({auctionRecords: {new: 'record'}})
                console.log('attempting to get auction records')
            }
        })
    }

    handleTransitUpdate =  (updatedRecord) => {
        let filtered = [...this.state.repoRecords].filter(record => record.id !== updatedRecord.id)

        let updatedAuction;
        if(Array.isArray(this.state.auctionRecords)){
            updatedAuction = [...this.state.auctionRecords, updatedRecord]
        } else {
            updatedAuction = []
            updatedAuction.push(updatedRecord)
        }
     
        this.setState({repoRecords: filtered, auctionRecords: updatedAuction})
    }

    render(){
        let { showAuction } = this.state;
        let { isadmin } = this.props.user;

        return (    
            <div>
                <h1 style={{textAlign: 'left', width: '98%', margin: 'auto'}} className="ui dividing header">
                        Auction Vehicles
                </h1> 

                <div style={{width: '98%', margin: 'auto', paddingTop: '2vh'}} className="ui tabular menu">
                    <p style={{cursor: "pointer"}}
                    className={showAuction ? 'item' : 'item active'} onClick={() => this.toggleTable(false)}>
                        In Transit
                    </p>

                    <p style={{cursor: "pointer"}}
                    className={showAuction ? 'item active' : 'item'} onClick={() => this.toggleTable(true)}>
                        At Auction
                    </p>

                </div>

                {showAuction ? (
                    < AuctionTable 
                    auctionRecords={this.state.auctionRecords} 
                    userAdmin={isadmin}
                    />
                ) : (
                    < PendingAuctionTable 
                    repoRecords={this.state.repoRecords} 
                    userAdmin={isadmin}
                    update={this.handleTransitUpdate}/>
                )}

            </div>
        )
    }
}

export default withRouter(AuctionPage);