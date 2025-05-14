// src/Pages/FunctionPage.jsx
import React from "react";
import { uploadCommunityDataset } from "../utils/uploadCommunityData";

export default function FunctionPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Function Panel</h2>
      <button onClick={uploadCommunityDataset}>Upload Community Dataset</button>
    </div>
  );
}
