import React, { useState, useEffect } from "react";
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";

export default function CustomerDetail() {
  const [customer, setCustomer] = useState([]);
  const userKit = new UserKit();
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const id = params.get("id");

  useEffect(() => {
    fetchCustomer();
  }, []);

  function fetchCustomer() {
    userKit
      .getCustomer(id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomer(data.results);
      });
  }

  return (
    <div>
      <h1>
        Test {customer.id} {customer.firstName}
      </h1>
    </div>
  );
}
