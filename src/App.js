import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import UserKit from "./data/UserKit";
import RegisterCustomer from "./components/RegisterCustomer";



function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [organisationKind, setOrganisationKind] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const userKit = new UserKit();
  const history = useHistory();
  // Use URL Search Params to parse the query parameters from the url
  const params = new URLSearchParams(history.location.search);
  const uid = params.get("uid");
  const token = params.get("token");

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
        history.push("/register")
      });
  }

  function handleActivateAccount() {
    userKit.activateUser(uid, token).then(history.push("/login"));
  }

  function handleLogin() {
    userKit
      .login(email, password)
      .then((res) => res.json())
      .then((data) => {
        userKit.setToken(data.token);
        history.push("/home");
      });
  }

  function getAllCustomers() {
    console.log("getAllCustomers started")
    userKit
      .getCustomerList()
      .then((res) => res.json())
      .then((data) => {
        setCustomerList(data.results);
      });
  }

  
  function renderInput(index, placeholder, stateVariable, stateSetVariable) {
    return (
      <div key={index}>
        <label>{placeholder}</label>
        <input placeholder={placeholder} value={stateVariable} onChange={(e) => stateSetVariable(e.target.value)} />
      </div>
    )
  }
  const inputObjects = [
    ["First Name", firstName, setFirstName],
    ["Last Name", lastName, setLastName],
    ["Email", email, setEmail],
    ["Password", password, setPassword],
    ["Organisation Name", organisationName, setOrganisationName],
    ["Organisation Kind (0,1,2)", organisationKind, setOrganisationKind]
  ]

  return (
    <div>
      <Switch>
        <Route path="/home">
          <h1>Welcome to Business Application</h1>
          <button onClick={getAllCustomers}>Get all customers</button>
          
          {customerList.map((customerItem) => {
           
            return <p>{customerItem.data}</p>
          })}
          
        </Route>
        <Route path="/login">
          <h1>Activate account</h1>
          {/* Only show that account is beeing activated if uid and token exists in URL */}
          {uid && token && (
            <div>
              Your account is being activated
              {handleActivateAccount()}
            </div>
          )}
          {/* If uid and token doesn't exist in url, render login form */}
          {!uid && !token && (
            <div>
              <p>Your account is now active. Please Login</p>
              <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
              <h4>If you don't have any account sign up here ;)</h4>
              <button onClick={() => history.push('/register') }>Create account</button>
            </div>
            
          )}
        </Route>
        <Route path="/register">
          <RegisterCustomer />
          <h1>Register</h1>
          <h3>Enter details to register</h3>
          <div>
            {inputObjects.map((inputItem, index) => {
              return renderInput(index, inputItem[0], inputItem[1], inputItem[2])
            })}
          </div>
          <button onClick={handleCreateUser}>Create User</button>
          <button onClick={() => { handleActivateAccount(); history.push('/login'); }}>Login</button>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
