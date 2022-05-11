import React from "react";

const Navbar = ({ handleViewClick }) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" onClick={() => handleViewClick("HomePage")}><strong>Apples to Oranges</strong></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link" onClick={() => handleViewClick("HomePage")}>Home</a>
            <a class="nav-link" onClick={() => handleViewClick("Lobby")}>Lobby</a>
            <a class="nav-link" onClick={() => handleViewClick("CustomDeck")}>Custom Decks</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
