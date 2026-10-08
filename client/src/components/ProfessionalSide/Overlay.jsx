import { useEffect, useRef } from "react";
export default function Overlay({ isOpen, onClose, children, className = "", showCloseButton = true }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && !dialog.open) dialog.showModal();
    else if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);
  return <dialog ref={dialogRef} className={`overlay-content ${className}`} aria-labelledby="detail-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    {showCloseButton && <button className="overlay-close" onClick={onClose} aria-label="Close details">
      {className.split(" ").includes("project-overlay") ? <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m6.7 5.3 5.3 5.3 5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3z" /></svg> : "×"}
    </button>}{children}
  </dialog>;
}
