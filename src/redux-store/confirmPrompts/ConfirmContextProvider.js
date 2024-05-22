/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const ConfirmContext = createContext();
function ConfirmContextProvider({ children }) {
  const [confirm, setConfirm] = useState({
    isOpen: false,
    nextTab: null,
    proceed: null,
    cancel: null
  });

  return (
    <ConfirmContext.Provider value={[confirm, setConfirm]}>{children}</ConfirmContext.Provider>
  );
}
export default ConfirmContextProvider;
