import React from "react";
import "./PageNotFound.css";
export default function PageNotFound({ from }: { from: string }) {
  console.log(from);
  return <section className="pagenotfound-container">Page: {from} not found.</section>;
}
