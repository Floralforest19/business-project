import React, {useState} from 'react'
import UserKit from '../data/UserKit'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components';

const H1 = styled.h1`
font-size: 1,2rem;
color: lightcoral;
margin-left: 3%;
`
const H3 = styled.h3`
  font-size: 1, 1rem;
  color: lightcoral;
  margin-left: 3%;
`;


const Div = styled.div`
  background: lavenderblush;
  width: 70%;
  margin: 0% 0%;
  border: 2px solid black;
`
const Divinner = styled.div`
width: 60%;
color: lightcoral;
padding: 16px;
`
const ButtonC = styled.button`
margin-left: 3%;
margin-bottom: 2%;
`
const ButtonL = styled.button`
margin-left: 2%;
`

export default function App() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [organisationName, setOrganisationName] = useState("");
    const [organisationKind, setOrganisationKind] = useState("");
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
        ["First Name: ", firstName, setFirstName],
        ["Last Name: ", lastName, setLastName],
        ["Email: ", email, setEmail],
        ["Password: ", password, setPassword],
        ["Organisation Name: ", organisationName, setOrganisationName],
        ["Organisation Kind (0,1,2): ", organisationKind, setOrganisationKind],
    ];

    function handleCreateUser() {
        userKit
            .register(
                firstName,
                lastName,
                email,
                password,
                organisationName,
                organisationKind
            )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                history.push("/register-user");
            });
    }

    function handleActivateAccount() {
        userKit.activateUser(uid, token).then(history.push("/login"));
    }

    return (
        <Div>
            <H1>Register</H1>
            <H3>Enter details to register</H3>
            <Divinner>
                {inputObjects.map((inputItem, index) => {
                    return renderInput(
                        index,
                        inputItem[0],
                        inputItem[1],
                        inputItem[2]
                    );
                })}
            </Divinner>
            <ButtonC onClick={handleCreateUser}>Create User</ButtonC>
            <ButtonL
                onClick={() => {
                    handleActivateAccount();
                    history.push("/login");
                }}
            >
                Login
          </ButtonL>
        </Div>
    )
}
