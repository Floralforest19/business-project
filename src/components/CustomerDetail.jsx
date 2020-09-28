import React, { useState, useEffect } from "react";
import '../App';
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

const H1 = styled.h1`
font-size: 1,1rem;
color: lightcoral;
`


const P = styled.p`
  font-size: 1rem;
  color: lightcoral;
`;
const Div = styled.div`
  padding: 22px;
  background: lavenderblush;
`
const InnerDiv = styled.div`
widht: 55px;


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
        setCustomerView(data);
      });
  }


  function customerDelete() {
    userKit
      .deleteCustomer(id);
  }

  return (
    <Div>
      <InnerDiv>
        <H1>Customer {customerView.id}</H1>
        <P>
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
        </P>
      </InnerDiv>
      <button
        onClick={() => {
          history.push("/welcome");
        }}
      >
        Go back
      </button>
      <button
        onClick={() => {
            customerDelete();
          history.push("/welcome");
        }}
      >
        Delete
      </button>
    </Div>
  );
}
