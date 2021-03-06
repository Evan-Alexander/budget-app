import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }) => {
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Budget App</h1>
        <button className="login-button" onClick={startLogin}>
          <div className="g-logo"></div>Login with Google
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});
export default connect(undefined, mapDispatchToProps)(LoginPage);
