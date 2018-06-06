import React from "react";
import Header from "../components/Header";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

export const PrivateRoute = ({isAuth, component: Component, ...rest}) => (
    <Route {...rest} component={(props) => (
        isAuth ? (<div>
                    <Header />
                    <Component {...props} />
                  </div>) : 
                 (<Redirect to="/" />) 
    )} />
);

const mapStateToProps = (state) => ({
    isAuth: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute)