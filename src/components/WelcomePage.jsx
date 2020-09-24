import React, {useState, useEffect} from 'react'
import UserKit from '../data/UserKit'
import {useHistory} from 'react-router-dom'

export default function WelcomePage( ) {

   
    const [customerList, setCustomerList] = useState([]);
    const userKit = new UserKit();
    const history = useHistory();
    const params = new URLSearchParams(history.location.search);
    const uid = params.get("uid");
    const token = params.get("token");

    
    useEffect(() => {
        if (token) {
            fetchClients()
        }
    })

    
    function fetchClients() {
    
        userKit
            .getCustomerList()
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
               
            });
    }
   
   
  

    return (
        <div>
            
            <h1>Welcome </h1>

            <button onClick={fetchClients}>Get customers</button>
            {customerList.map(customerItem => {
                return <p>{customerItem}</p>
            })}
            
            <button onClick={()=> history.push("/customer-detail")}>Create new customer</button>

            <button onClick={() => history.push("/login")}>Log out</button>

            
        </div>
    )
}
