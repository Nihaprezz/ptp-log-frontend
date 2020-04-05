import React from "react";

const backend_url = process.env.REACT_APP_BACKEND

class SoldPage extends React.Component {
    constructor(){
        super();

        this.state = {
            soldRecords: []
        }
    }

    componentDidMount(){
        if(this.props.user.isadmin){
            this.getUserSold();
        } else {
            this.getAllSold();
        }

    }

    getAllSold = () => {
        fetch(backend_url + 'sold_records', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(records => this.setState({soldRecords: records}))
        .catch(err => alert(err))
    }

    getUserSold = () => {
        let id = this.props.user.id
        fetch(backend_url + `sold_records/user/${id}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(records =>  this.setState({soldRecords: records}))
        .catch(err => alert(err))
    }

    render(){
        console.log(this.state)
        return (
            <div>
                Sold Page will be rendered here
            </div>
        )
    }
}

export default SoldPage;