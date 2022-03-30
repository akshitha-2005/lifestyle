import React from "react";

function Loader() {
  return (
    <div class="d-flex justify-content-center loader">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
