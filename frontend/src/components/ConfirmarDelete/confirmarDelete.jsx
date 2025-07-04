// src/components/ConfirmModal/ConfirmModal.jsx
import React from "react";
import "../modal.css";

export default function ConfirmarDelete({ visible, message, onConfirm, onCancel }) {
  if (!visible) return null; // não renderiza nada se não estiver visível

  return (
    <>
      <div className="modal-overlay" onClick={onCancel} />
      <div className="modal-container">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="btn btn-confirm" onClick={onConfirm}>Confirmar</button>
          <button className="btn btn-cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </>
  );
}
