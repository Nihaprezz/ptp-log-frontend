import React from "react";
import { daysInBetween } from "../../utils/index"
import Swal from "sweetalert2"

const backend_url = process.env.REACT_APP_BACKEND

const RepodRecord = (props) => {
    let { id, acct_no, first_name, last_name, veh_info, veh_vin, repo_company, repod_on } = props.repoObj;
    let cuName;
    props.repoObj.creditunion ? cuName = props.repoObj.creditunion.name : cuName = 'Credit Union Deleted'

    const showForm = (id) => {
        Swal.fire({
            title: 'Enter Auction Name',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Transport',
            showLoaderOnConfirm: true,
            preConfirm: (auctionName) => {
              return fetch(backend_url + `/auction_records`, {
                  method: 'POST',
                  headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                  }, 
                  body: JSON.stringify({
                      repo_order: id,
                      auction_name: auctionName
                  })
                })
                .then(response => {
                  if (!response.ok) {
                    throw new Error(response.statusText)
                  }
                  return response.json()
                })
                .catch(error => {
                  Swal.showValidationMessage(
                    `Request failed: ${error}`
                  )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((record) => {
              if(record.value.id){
                  Swal.fire('Success', 'Repo Order has been updated.', 'success')
                  props.update(record.value.repo_order_id)
              }
          })

    }

    return (
        <tr>
            <td>{acct_no}</td>
            <td>{cuName}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{veh_info}</td>
            <td>{veh_vin}</td>
            <td>{repo_company}</td>
            <td>{repod_on}</td>
            <td>{daysInBetween(repod_on)}</td>
            {props.isadmin ? (
                <td>
                    <button onClick={() => showForm(id)} className="ui button">Transport</button>
                </td>
            ): null}
        </tr>
    )
}

export default RepodRecord