import React, { useState } from "react";
import {UserContext} from "./context/UserContext";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import UserKit from "./data/UserKit";
import WelcomePage from "./components/WelcomePage";
import RegisterUser from "./components/RegisterUser";
import CreateCustomer from "./components/CreateCustomer";
import CustomerDetail from "./components/CustomerDetail";
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 1, 2rem;
  color: lightcoral;
  margin-left: 3%;
`;
const H2 = styled.h2`
  font-size: 1, 1rem;
  color: lightcoral;
  margin-left: 3%;
`;
const Div = styled.div`
  background: lavenderblush;
  width: 70%;
  margin: 0% 0%;
  border: 2px solid black;
`;
const Divloggin = styled.div`
  width: 60%;
  color: lightcoral;
  padding: 16px;
`;

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [customerList, setCustomerList] = useState([]);

  const userKit = new UserKit();
  const history = useHistory();
  // Use URL Search Params to parse the query parameters from the url
  const params = new URLSearchParams(history.location.search);
  const uid = params.get("uid");
  const token = params.get("token");

  function handleActivateAccount() {
    userKit.activateUser(uid, token).then(history.push("/login"));
  }

  function handleLogin() {
    userKit
      .login(email, password)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.token) {
          alert("Invalid login");
          return false;
        }

        userKit.setToken(data.token);
        userKit
          .getMe()
          .then((res) => res.json())
          .then((data) => {
            if (!data) {
              alert("Invalid");
              return false;
            }
            userKit.setUser(data);
            history.push("/welcome");
          });
      });
  }

  return (
    <Div>
      <UserContext.Provider value={{ customerList, setCustomerList }}>
        <Switch>
          <Route path="/login">
            <H1>Activate account</H1>
            {uid && token ? (
              <div>
                Your account is being activated
                <button onClick={handleActivateAccount()}></button>
              </div>
            ) : (
              <Divloggin>
                <H2>Welcome and login</H2>
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
                <button onClick={() => history.push("/register-user")}>
                  Create account
                </button>
              </Divloggin>
            )}
          </Route>
          <Route path="/register-user">
            <RegisterUser />
          </Route>

          <Route path="/welcome">
            <WelcomePage />
          </Route>

          <Route path="/customer-create">
            <CreateCustomer />
          </Route>

          <Route path="/customer-detail">
            <CustomerDetail />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Div>
  );
}

export default App;
