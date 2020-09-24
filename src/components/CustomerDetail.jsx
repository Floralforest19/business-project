import React, { useState } from "react";
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";

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
    placeholder,
    stateVariable,
    stateSetVariable,
    inputtype
  ) {
    return (
      <div key={index}>
        <label>{placeholder}</label>
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
    ["First Name", name, setName, "text"],
    ["OrganisationNr", organisationNr, setOrganisationNR, "text"],
    ["VatNr", vatNr, setVatNr, "text"],
    ["Reference", reference, setReference, "text"],
    ["PaymentTerm", paymentTerm, setPaymentTerm, "number"],
    ["Website", website, setWebsite, "text"],
    ["Email", email, setEmail, "email"],
    ["PhoneNumber", phoneNumber, setPhoneNumber, "number"],
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
    <div>
      <h1>Register details</h1>
      <div>
        {inputObjects.map((inputItem, index) => {
          return renderInput(
            index,
            inputItem[0],
            inputItem[1],
            inputItem[2],
            inputItem[3]
          );
        })}
      </div>
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
          handleCreateCustomer();
          history.push("/welcome");
        }}
      >
        Create Customer
      </button>
    </div>
  );
}
