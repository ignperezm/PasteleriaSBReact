// src/components/ImagenProducto.jsx
import React from "react";

function ImagenProducto({ src, alt }) {
  return (
    <img
      id="detalle-imagen"
      src={`/img/${src.replace("img/", "")}`}
      alt={alt}
    />
  );
}

export default ImagenProducto;