import React, { useState } from "react";

const Navbar = ({ handleViewClick, pageView }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" onClick={() => handleViewClick("HomePage")}><strong><span className="apples-logo">Apples</span> <span className="to-logo">to</span> <span className="oranges-logo">Oranges</span></strong></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className={pageView === "HomePage" ? "nav-link active" : "nav-link"} onClick={() => handleViewClick("HomePage")}>Home</a>
            <a className={pageView === "Lobby" ? "nav-link active" : "nav-link"} onClick={() => handleViewClick("Lobby")}>Lobby</a>
            <a className={pageView === "CustomDeck" ? "nav-link active" : "nav-link"} onClick={() => handleViewClick("CustomDeck")}>Custom Decks</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
