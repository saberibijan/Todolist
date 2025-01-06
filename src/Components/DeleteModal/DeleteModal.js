import React from "react";
import ReactDOM from "react-dom";
import "./DeleteModal.css";

export default function DeleteModal({submitAction, cancelAction}) {
  return ReactDOM.createPortal(
    <div className="modal-parent active">
      <div className="delete-modal">
        <h1>Are you sure to delete?</h1>
        <div className="delete-modal-btns">
          <button className="delete-btn delete-modal-accept-btn" onClick={()=> submitAction()}>Yes</button>
          <button className="delete-btn delete-modal-reject-btn"onClick={()=> cancelAction()}>No</button>
        </div>
      </div>
    </div>,
    document.getElementById("modals-parent")
  );
}
