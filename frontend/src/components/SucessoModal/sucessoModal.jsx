// src/components/SuccessModal/SuccessModal.jsx
import React from "react";
import "../modal.css";

export default function SucessoModal({ visible, message, onClose }) {
  if (!visible) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-container">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="btn btn-confirm-sucess" onClick={onClose}>OK</button>
        </div>
      </div>
    </>
  );
}
