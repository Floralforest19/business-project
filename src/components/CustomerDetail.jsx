import React, { useState } from 'react'
import UserKit from '../data/UserKit'
import { useHistory } from 'react-router-dom'

export default function App() {


    const [name, setName] = useState([]);
    const [organisationNr, setOrganisationNR] = useState([]);
    const [vatNr, setVatNr] = useState([]);
    const [reference, setReference] = useState([]);
    const [paymentTerm, setPaymentTerm] = useState([]);
    const [website, setWebsite] = useState([]);
    const [email, setEmail] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState([]);
    const [address, setAddress] = useState([]);

    const userKit = new UserKit();
    const history = useHistory();

    const params = new URLSearchParams(history.location.search);
    const uid = params.get("uid");
    const token = params.get("token");

    function renderInput(index, placeholder, stateVariable, stateSetVariable) {
        return (
            <div key={index}>
                <label>{placeholder}</label>
                <input
                    placeholder={placeholder}
                    value={stateVariable}
                    onChange={(e) => stateSetVariable(e.target.value)}
                />
            </div>
        );
    }
    const inputObjects = [
        ["First Name", name, setName],
        ["OrganisationNr", organisationNr, setOrganisationNR],
        ["VatNr", vatNr, setVatNr],
        ["Reference", reference, setReference],
        ["PaymentTerm", paymentTerm, setPaymentTerm],
        ["Website", website, setWebsite],
        ["Email", email, setEmail],
        ["PhoneNumber", phoneNumber, setPhoneNumber],
        ["Address", address, setAddress],
    ];

    function handleCreateCustomer() {
        userKit
            .createCustomer(
                name,
                organisationNr,
                vatNr,
                reference,
                paymentTerm,
                website,
                email,
                phoneNumber,
                address
            )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                history.push("/me");
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
                        inputItem[2]
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
        </div>
    )
}
