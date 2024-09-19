import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal">
      <h3>Confirmation</h3>
        <p>Are you sure you want to delete this Data?</p>
        <button className='yesButton' onClick={onConfirm}>Yes, Delete</button>
        <button className='noButton' onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
