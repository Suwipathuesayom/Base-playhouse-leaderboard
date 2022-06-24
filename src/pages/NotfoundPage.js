import React from "react";
import { Button} from "@mui/material";

const NotfoundPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>404</h1>
      <p>ขออภัย ไม่พบหน้าเพจที่ต้องการ</p>
      <Button variant="contained" color="error">
        Back
      </Button>
    </div>
  );
};

export default NotfoundPage;
