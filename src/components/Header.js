import React from 'react';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {startLogout} from "../actions/auth.js";

export const Header = (props) => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/dashboard" exact={true} activeClassName="isActive">Dashboard</NavLink>
        <NavLink to="/create" activeClassName="isActive">Create Expense</NavLink>
        <button onClick={props.startLogout}>Log Out</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);