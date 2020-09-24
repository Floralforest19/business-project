import React, {useState} from 'react'
import UserKit from '../data/UserKit'
import {useHistory} from 'react-router-dom'

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
        ["First Name", firstName, setFirstName],
        ["Last Name", lastName, setLastName],
        ["Email", email, setEmail],
        ["Password", password, setPassword],
        ["Organisation Name", organisationName, setOrganisationName],
        ["Organisation Kind (0,1,2)", organisationKind, setOrganisationKind],
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
        <div>
            <h1>Register</h1>
            <h3>Enter details to register</h3>
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
            <button onClick={handleCreateUser}>Create User</button>
            <button
                onClick={() => {
                    handleActivateAccount();
                    history.push("/login");
                }}
            >
                Login
          </button>
        </div>
    )
}
