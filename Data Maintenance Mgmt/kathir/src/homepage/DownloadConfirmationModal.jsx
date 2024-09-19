import React from 'react';
import './DownloadConfirmationModal.css';

const DownloadConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-confirmation-modal-overlay">
      <div className="custom-confirmation-modal">
        <h2>{message}</h2>
        <div className="modal-buttons">
          <button className="btn-confirm" onClick={onConfirm}>Yes</button>
          <button className="btn-cancel" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DownloadConfirmationModal;
