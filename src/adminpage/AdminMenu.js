import React from "react";


const AdminMenu = (props) => {
    return (
        <div className="menu-container">
            <div className="ui three item menu adminMenu">
                {/* eslint-disable-next-line*/}
                <a className="item" onClick={() => props.changePage('ptpTracker')}>PTP Tracker</a>

                {/* eslint-disable-next-line*/}
                <a className="item" onClick={() => props.changePage('users')}>Users</a>

                {/* eslint-disable-next-line*/}
                <a className="item" onClick={() => props.changePage('ptpManager')}>PTP Manager</a>
            </div>
        </div>
    )
} 

export default AdminMenu