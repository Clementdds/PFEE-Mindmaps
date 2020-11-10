import React from "react";
import userService from "../Services/UserService";
const Header = () => {
    return (
      <header>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
        <nav class="navbar ">
          <h1  class="Title" >MindMap Viewer</h1>
          <button class="btn btn-outline-light btn-sm" onClick={userService.logout}>Déconnexion</button>
        </nav>
      </header>
    );
};

export default Header;