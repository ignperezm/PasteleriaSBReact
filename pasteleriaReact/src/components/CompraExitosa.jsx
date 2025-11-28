import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "../assets/css/compra-exitosa.css";

const CompraExitosa = ({ segundos = 5, onFinish }) => {
  const [count, setCount] = useState(segundos);
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (count <= 0) {
      if (onFinish) onFinish();
      return;
    }
    const id = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [count, onFinish]);

  return (
    <div
      className="compra-exitosa-overlay"
      aria-live="polite"
      role="status"
    >
      <Confetti width={size.width} height={size.height} numberOfPieces={400} recycle={true} gravity={0.2} />
      <div className="compra-exitosa-card">
        <h2 className="compra-exitosa-title">Compra realizada</h2>
        <p className="compra-exitosa-text">
          Tu pedido ha sido procesado correctamente.
        </p>
        <div className="compra-exitosa-info">
          Serás redirigido al inicio en <strong>{count}</strong> segundos.
        </div>
        <button
          className="compra-exitosa-btn"
          onClick={() => onFinish && onFinish()}
        >
          Volver ahora
        </button>
      </div>
    </div>
  );
};

export default CompraExitosa;
