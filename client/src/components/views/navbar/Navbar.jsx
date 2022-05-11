import React, { useState } from "react";

const Navbar = ({ handleViewClick }) => {
  const [selected, isSelected] = useState("HomePage");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" onClick={() => handleViewClick("HomePage")}><strong>Apples to Oranges</strong></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className={selected === "HomePage" ? "nav-link active" : "nav-link"} onClick={() => {
              isSelected("HomePage");
              handleViewClick("HomePage");
            }}>Home</a>
            <a className={selected === "Lobby" ? "nav-link active" : "nav-link"} onClick={() => {
              isSelected("Lobby");
              handleViewClick("Lobby");
            }}>Lobby</a>
            <a className={selected === "CustomDeck" ? "nav-link active" : "nav-link"} onClick={() => {
              isSelected("CustomDeck");
              handleViewClick("CustomDeck");
            }}>Custom Decks</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
