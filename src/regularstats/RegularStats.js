import React from "react";

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
]

const backend_url = `http://localhost:3001/`

class RegularStats extends React.Component {
    constructor(){
        super()

        this.state = {
            userStats: []
        }
    }

    componentDidMount(){
        fetch(backend_url + `stats/${this.props.user.id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({userStats: data})
        })
        .catch(err => console.log(err))
    }
    
    getMonth = () => {
        const d = new Date();
        return monthNames[d.getMonth()]
    }

    render(){
        return (
            <div>
                <h1>Stats for {this.getMonth()}</h1>
                <table className="ui celled table">
                    <thead>
                    <tr>
                        <th>Credit Union</th>
                        <th>Total PTP's Taken</th>
                        <th>Total Closed PTPs</th>
                        <th>Total Amount Promise</th>
                        <th>Total Amount Collected</th>
                        <th>Percentage of Amount Collected</th>
                    </tr>
                    </thead>
                </table>
            </div>
        )
    }
}

export default RegularStats