import React from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null; // Do not render anything if the modal is not open

  return (
    <>
      {/* Overlay */}
      <div className="modal-overlay" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          ×
        </button>
        {children} {/* This will be the content passed inside the modal */}
      </div>
    </>
  );
};

export default Modal;
