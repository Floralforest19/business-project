import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 1, 2rem;
  color: lightcoral;
  margin-left: 3%;
`;
const P = styled.p`
  color: blue;
  font-size: 1rem;
  margin-left: 3%;
`;
const Button = styled.button`
  margin-left: 3%;
  margin-bottom: 2%;
`;

export default function WelcomePage() {
  const { customerList, setCustomerList } = useContext(UserContext);
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
      <H1>
        Welcome {user.firstName} {user.lastName} <br />
        {user.email}
      </H1>
      <Button onClick={fetchClients}>Get customers</Button>
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
      <Button onClick={() => history.push("/customer-create")}>
        Create new customer
      </Button>
      <button onClick={() => history.push("/login")}>Log out</button>
    </div>
  );
}
