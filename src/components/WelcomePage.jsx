import React, { useState, useEffect } from "react";
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';



const Text = styled.p`
color: mediumpurple;
font-size:1rem;
`



export default function WelcomePage() {
  const [customerList, setCustomerList] = useState([]);
  const userKit = new UserKit();
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const uid = params.get("uid");
  const token = params.get("token");

  useEffect(() => {
    if (token) {
      fetchClients();
    }
  });

  function fetchClients() {
    userKit
      .getCustomerList()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomerList(data.results);
      });
  }

  var user = userKit.getUser()
  console.log(user)

  return (
    <div>
      <h1>Welcome {user.firstName}</h1>

      <button onClick={fetchClients}>Get customers</button>
      {customerList.map((customerItem) => {

      return <Text>
        Id: {customerItem.id},  
        Name: {customerItem.name}, 
      OrganisationNr: {customerItem.organisationNr},
      VatNr: {customerItem.vatNr},
      Reference: {customerItem.reference},
      Payment-term: {customerItem.paymentTerm},
      Website: {customerItem.website},
      Email: {customerItem.email},
      Phonenumber: {customerItem.phoneNumber}
      </Text>;
      })}

      <button onClick={() => history.push("/customer-detail")}>
        Create new customer
      </button>

      <button onClick={() => history.push("/login")}>Log out</button>
    </div>
  );
}
