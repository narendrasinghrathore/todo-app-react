import React from "react";
import "./PageNotFound.css";
export default function PageNotFound({ from }: { from: string }) {
  return (
    <section className="pagenotfound-container">
      Page: {from} not found.
    </section>
  );
}
