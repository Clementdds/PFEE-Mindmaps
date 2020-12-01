import React from "react";
import userService from "../Services/UserService";
import {Link} from "react-router-dom";
import '../Assets/Scss/Header.scss'
import PrivateComponent from "../Components/Private/PrivateComponent";
import {connect} from "react-redux";

const Header = ({isSignedIn}) => {
    return (
        <header>
            <nav className="navbar ">

                <Link to={"/"}>
                    <h1 className="Title">
                        MindMap Viewer
                    </h1>
                </Link>

                <PrivateComponent>
                    <Link to={"/form"}>
                        <h1 className="Title">
                            Ajouter un mindmap
                        </h1>
                    </Link>
                </PrivateComponent>
                {isSignedIn && 
                <button className="btn btn-outline-light btn-sm" onClick={userService.logout}>
                    Déconnexion
                </button>
                }
            </nav>
        </header>
    );
};

const MapStateToProps = state => {
    return {
        isSignedIn: state.User.isSignedIn
    };
};


export default connect(MapStateToProps)(Header);