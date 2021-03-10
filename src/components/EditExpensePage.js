import React from "react";

const EditPage = (props) => {
  return <div>editing the expense with the id of {props.match.params.id}</div>;
};

export default EditPage;
