import React, { useState, useEffect } from "react";
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

const H1 = styled.h1`
font-size: 1,1rem;
color: blue;
`


const Text = styled.text`
  font-size: 1rem;
  color: blue;
  background: whitesmoke;
`;
const Div = styled.div`
  padding: 20px;
`
const InnerDiv = styled.div`
widht: 55px;
height: 75px;

`


export default function CustomerDetail() {
  const [customerView, setCustomerView] = useState({});
  const userKit = new UserKit();
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const id = params.get("id");

  useEffect(() => {
    fetchCustomerView();
  }, []);

  function fetchCustomerView() {
    userKit
      .getCustomer(id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomerView(data);
      });
  }

  return (
    <Div>
      <InnerDiv>
        <H1>Customer {customerView.id}</H1>
        <Text>
          Name: {customerView.name}
          <br /> <br />
          OrgNr: {customerView.organisationNr}
          <br /> <br />
          VatNr: {customerView.vatNr}
          <br /> <br />
          Reference: {customerView.reference}
          <br /> <br />
          Payment-term: {customerView.paymentTerm}
          <br /> <br />
          Website: {customerView.website}
          <br /> <br />
          Email: {customerView.email}
          <br /> <br />
          Phonenumber: {customerView.phoneNumber}
        </Text>
      </InnerDiv>
    </Div>
  );
}
