import React from "react";
import "./PageNotFound.css";
import { useLocation } from "react-router-dom";
export default function PageNotFound() {
  let location = useLocation();
  return (
    <section className="pagenotfound-container">
      Page: {location.pathname} not found.
    </section>
  );
}
