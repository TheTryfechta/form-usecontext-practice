import React, { useEffect } from "react";

export default function Modal({ content, closeModal }) {
  useEffect(() => {
    setTimeout(() => closeModal(), 3000);
  });
  return <div className="modal">{content}</div>;
}
