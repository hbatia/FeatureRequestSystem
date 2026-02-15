import { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        {children}
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(243, 244, 246, 0.6);
          backdrop-filter: blur(5px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0px 4px 4px rgba(0,0,0,0.25), 0px 20px 60px rgba(0,0,0,0.15);
          border-radius: 10px;
          width: 560px;
          max-width: 560px;
          height: 628.28px;
          position: relative;
          z-index: 1001;
        }
      `}</style>
    </div>
  );
}
