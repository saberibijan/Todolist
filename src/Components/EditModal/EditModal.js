import React from 'react'
import ReactDOM from "react-dom";

import "./EditModal.css"
function EditModal({children}) {
  return ReactDOM.createPortal(
      <div className="modal-parent active">
        <div className="delete-modal">
          {children}
        </div>
      </div>,
      document.getElementById("modals-parent")
    );
}

export default EditModal