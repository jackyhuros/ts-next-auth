import React from "react";
import { headers } from "next/headers";

export default async function APIFromServer() {
  const resp = await fetch("http://localhost:3002/api/whoAmI", {
    method: "GET",
    headers: headers(), // must add headers coz if we dont it's calling api from itself, which nothing tends to be nothing happened
  }).then((res) => res.json());
  return (
    <div>
      <div>
        API Route From <span className="font-bold underline">Server</span>
      </div>
      <div>Name: {resp?.email}</div>
    </div>
  );
}
