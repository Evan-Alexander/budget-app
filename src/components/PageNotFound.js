import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => (
  <div>
    <p>404</p>
    <p>
      Page not Found! <Link to="/">Go home</Link>
    </p>
  </div>
);
export default PageNotFound;
