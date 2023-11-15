import React from "react";
import { Container } from "react-bootstrap";

function Header() {
  return (
    <div
      style={{ backgroundColor: "#313131", color: "white", padding: "15px" }}
    >
      <Container>
        <div>
          <h1 style={{ fontSize: "20px", margin: "0" }}>
            Employee<span style={{ fontWeight: "700" }}> EASE</span>
          </h1>
        </div>
      </Container>
    </div>
  );
}

export default Header;
