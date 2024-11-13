import React from "react";
import { get } from "../../utils/axios-http/axios-http";

function Role() {
  const response = get("/statistics/tours");

  console.log(response);

  return <div>Role</div>;
}

export default Role;
