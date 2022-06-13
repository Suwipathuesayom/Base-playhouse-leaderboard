import React from "react";

const EditableRow = () => {
  return (
    <tr>
      <td>
        <input
          type="text"
          className="form-control"
          placeholder="Project Name"
        />
      </td>
      <td>
        <input
          type="text"
          className="form-control"
          placeholder="Last Edit"
          name="LastEdit"
        />
      </td>
      <td>
        <input
          type="text"
          className="form-control"
          placeholder="Total"
          name="Total"
        />
      </td>
    </tr>
  );
};

export default EditableRow;
