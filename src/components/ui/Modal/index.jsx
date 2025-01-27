import React, { useEffect } from "react";

const Modal = ({ onKeyEvent, modalRef, children }) => {
  useEffect(() => {
    modalRef.current?.focus();
  }, []);
  return (
    <div
      onKeyDown={onKeyEvent}
      ref={modalRef}
      tabIndex={0}
      className="w-full fixed min-h-screen z-20 top-0 left-0 overflow-auto bg-darkBg backdrop-blur-[7.5px] transition"
    >
      <div className="w-full flex items-center m-auto p-4 min-h-screen pointer-events-auto select-none max-w-[600px]">
        {children}
      </div>
    </div>
  );
};

export default Modal;
