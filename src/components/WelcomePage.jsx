import React, {useState, useEffect} from 'react'
import UserKit from '../data/UserKit'
import {useHistory} from 'react-router-dom'

export default function App() {

   
    const [customerList, setCustomerList] = useState([]);
    const userKit = new UserKit();
    const history = useHistory();
    const params = new URLSearchParams(history.location.search);
    const uid = params.get("uid");
    const token = params.get("token");

    function getAllCustomers() {
        console.log("getAllCustomers started");
        userKit
            .getCustomerList()
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCustomerList(data.results);
            });
    }
    useEffect(() => {
        if (token) {
            getAllCustomers()
        }
    })

   
  

    return (
        <div>
            
            <h1>Welcome </h1>

            <button onClick={getAllCustomers}>Get customers</button>

            {customerList.map((customerItem) => {
                return <p>{customerItem.data}</p>;
            })}
            <button onClick={()=> history.push("/create-customer")}>Create customer</button>

            <button onClick={() => history.push("/login")}>Log out</button>

            
        </div>
    )
}
