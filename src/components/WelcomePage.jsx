import React, { useState, useEffect } from "react";
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const P = styled.p`
  color: blue;
  font-size: 1rem;
`;

export default function WelcomePage() {
  const [customerList, setCustomerList] = useState([]);
  const userKit = new UserKit();
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const uid = params.get("uid");
  const token = params.get("token");

  useEffect(() => {
    if (token) {
      fetchClients();
    }
  });

  function fetchClients() {
    userKit
      .getCustomerList()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomerList(data.results);
      });
  }

  var user = userKit.getUser();

  return (
    <div>
      <h1>
        Welcome {user.firstName} {user.lastName} {user.email}
      </h1>
      <button onClick={fetchClients}>Get customers</button>
      <br /> <br />
      {customerList.map((customerItem) => {
        return (
          <P
            onClick={() =>
              history.push("/customer-detail?id=" + customerItem.id)
            }
            key={customerItem.id}
          >
            {customerItem.website}
          </P>
        );
      })}
      <button onClick={() => history.push("/customer-create")}>
        Create new customer
      </button>
      <button onClick={() => history.push("/login")}>Log out</button>
    </div>
  );
}
