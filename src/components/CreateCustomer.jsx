import React, { useState } from "react";
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';


const Renderinput = styled.div`
  width: 60%;
  margin: 0 auto;
`
const Renderinputinner = styled.div`
  width: 50%;
`;


export default function App() {
  const [name, setName] = useState([]);
  const [organisationNr, setOrganisationNR] = useState([]);
  const [vatNr, setVatNr] = useState([]);
  const [reference, setReference] = useState([]);
  const [paymentTerm, setPaymentTerm] = useState([]);
  const [website, setWebsite] = useState([]);
  const [email, setEmail] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);

  const userKit = new UserKit();
  const history = useHistory();

  const params = new URLSearchParams(history.location.search);
  const uid = params.get("uid");
  const token = params.get("token");

  function renderInput(
    index,
    label,
    placeholder,
    stateVariable,
    stateSetVariable,
    inputtype
  ) {
    return (
      <div key={index}>
        <label> {label} </label>
        <input
          type={inputtype}
          placeholder={placeholder}
          value={stateVariable}
          onChange={(e) => stateSetVariable(e.target.value)}
        />
      </div>
    );
  }
  const inputObjects = [
    ["First Name:", "Name", name, setName, "text"],
    ["OrganisationNr:", "OrgNr", organisationNr, setOrganisationNR, "text"],
    ["VatNr:", "SE + 123456789", vatNr, setVatNr, "text"],
    ["Reference:", "Reference", reference, setReference, "text"],
    ["PaymentTerm:", "PaymentTerm", paymentTerm, setPaymentTerm, "number"],
    ["Website:", "Website.se", website, setWebsite, "text"],
    ["Email:", "Email@email.com", email, setEmail, "email"],
    ["PhoneNumber:", "000-0000000", phoneNumber, setPhoneNumber, "number"],
  ];

  function handleCreateCustomer() {
    userKit
      .createCustomer({
        name,
        organisationNr,
        vatNr,
        reference,
        paymentTerm,
        website,
        email,
        phoneNumber,
      })
      .then((res) => res.json())
      .then((data) => {
        if (!data.id) {
          alert("unable to create customer");
          return false;
        }
        console.log(data);
        history.push("/welcome");
      });
  }

  return (
    <Renderinput>
      <h1>Register details</h1>
      <Renderinputinner>
        {inputObjects.map((inputItem, index) => {
          return renderInput(
            index,
            inputItem[0],
            inputItem[1],
            inputItem[2],
            inputItem[3],
            inputItem[4]
          );
        })}
      </Renderinputinner>
      <button
        onClick={() => {
          handleCreateCustomer();
          history.push("/welcome");
        }}
      >
        Go back to Welcomepage
      </button>
      <button
        onClick={() => {
          if (!/^[SE]{2}\d{10}$/.test(vatNr)) {
            alert(
              "Invalid Vat number. Should be SE plus ten digits. Eg SE1234567890"
            );
            return false;
          }
          handleCreateCustomer();
          history.push("/welcome");
        }}
      >
        Create Customer
      </button>
    </Renderinput>
  );
}
