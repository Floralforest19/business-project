import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import UserKit from "./data/UserKit";
import WelcomePage from "./components/WelcomePage";
import RegisterUser from "./components/RegisterUser";
import CustomerDetail from "./components/CustomerDetail";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        if (!data.token) {
          alert("Invalid login");
          return false;
        }

        userKit.setToken(data.token);
        history.push("/welcome");
      });
  }

  return (
    <div>
      <Switch>
        <Route path="/login">
          <h1>Activate account</h1>
          {uid && token ? (
            <div>
              Your account is being activated
              <button onClick={handleActivateAccount()}></button>
            </div>
          ) : (
            <div>
              <h2>Welcome and login</h2>
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
            </div>
          )}
        </Route>
        <Route path="/register-user">
          <RegisterUser />
        </Route>

        <Route path="/welcome">
          <WelcomePage />
        </Route>

        <Route path="/customer-detail">
          <CustomerDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
