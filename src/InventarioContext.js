import React, { createContext, useState } from 'react';
import productosData from './data/productos.json'; // Importa el JSON

export const InventarioContext = createContext();

export const InventarioProvider = ({ children }) => {
  // Inicializa el estado con los datos del JSON
  const [productos, setProductos] = useState(productosData);

  const updateProducto = (id, updatedFields) => {
    setProductos(prevProductos =>
      prevProductos.map(producto =>
        producto.id === id ? { ...producto, ...updatedFields } : producto
      )
    );
  };

  const addProducto = (nuevoProducto) => {
    setProductos(prev => [...prev, { id: Date.now(), ...nuevoProducto }]);
  };

  const deleteProducto = (id) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <InventarioContext.Provider value={{ productos, updateProducto, addProducto, deleteProducto }}>
      {children}
    </InventarioContext.Provider>
  );
};