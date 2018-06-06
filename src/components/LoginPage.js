import React from "react";
import {connect} from "react-redux";
import {startLogin} from "../actions/auth.js";

export const LoginPage = (props) => (
    <button onClick={props.startLogin}>Login</button>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);