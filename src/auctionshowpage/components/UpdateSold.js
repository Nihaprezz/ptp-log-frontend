import React, {useEffect, useState} from "react";

const UpdateSold = (props) => {
    const [sale_date, setSale_date] = useState(props.record.auction_record.sale_date);
    const [sale_location, setSale_location] = useState(props.record.auction_record.auction_name);

    return (
        <div>
            <p>{sale_date}</p>
            <p>{sale_location}</p>
        </div>
    )
}

export default UpdateSold