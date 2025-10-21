// src/InventarioContext.js
import React, { createContext, useState, useEffect } from 'react';
import productosData from './productos.json'; // Corrige la ruta: src/productos.json

export const InventarioContext = createContext();

export const InventarioProvider = ({ children }) => {
  // Cargar datos iniciales desde productos.json o localStorage
  const [productos, setProductos] = useState(() => {
    const savedProductos = localStorage.getItem('productos');
    return savedProductos ? JSON.parse(savedProductos) : productosData;
  });

  // Guardar cambios en localStorage cada vez que productos cambie
  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  const addProducto = (nuevoProducto) => {
    // Generar un ID único basado en el máximo ID existente
    const newId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    setProductos([...productos, { id: newId, ...nuevoProducto }]);
  };

  const updateProducto = (id, updatedFields) => {
    setProductos(prevProductos =>
      prevProductos.map(producto =>
        producto.id === id ? { ...producto, ...updatedFields } : producto
      )
    );
  };

  const deleteProducto = (id) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <InventarioContext.Provider value={{ productos, addProducto, updateProducto, deleteProducto }}>
      {children}
    </InventarioContext.Provider>
  );
};

export default InventarioProvider;