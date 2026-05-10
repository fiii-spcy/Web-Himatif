import { createContext, useCallback, useContext, useMemo, useState } from "react";
import JoinHIMATIFModal from "../components/join/JoinHIMATIFModal";

const JoinHIMATIFContext = createContext(null);

export function JoinHIMATIFProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      isOpen,
      openModal,
      closeModal,
    }),
    [isOpen, openModal, closeModal]
  );

  return (
    <JoinHIMATIFContext.Provider value={value}>
      {children}
      <JoinHIMATIFModal open={isOpen} onClose={closeModal} />
    </JoinHIMATIFContext.Provider>
  );
}

export function useJoinHIMATIFModal() {
  const ctx = useContext(JoinHIMATIFContext);
  if (!ctx) throw new Error("useJoinHIMATIFModal must be used within provider");
  return ctx;
}

