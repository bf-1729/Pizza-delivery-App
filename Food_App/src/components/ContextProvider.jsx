import React, { createContext, useState } from 'react';

export const store = createContext();

function ContextProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPizzas, setFilteredPizzas] = useState([]);

  return (
    <store.Provider value={[searchTerm, setSearchTerm, filteredPizzas, setFilteredPizzas]}>
      {children}
    </store.Provider>
  );
}

export default ContextProvider;
