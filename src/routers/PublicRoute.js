import React from "react";
import Header from "../components/Header";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

export const PublicRoute = ({isAuth, component: Component, ...rest}) => (
    <Route {...rest} component={(props) => (
        !isAuth ? (<div>
                    <Component {...props} />
                  </div>) : 
                 (<Redirect to="/dashboard" />) 
    )} />
);

const mapStateToProps = (state) => ({
    isAuth: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute)