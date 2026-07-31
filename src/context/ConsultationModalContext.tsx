"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ConsultationModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextType | undefined>(undefined);

export function ConsultationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ConsultationModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ConsultationModalContext.Provider>
  );
}

export function useConsultationModal() {
  const context = useContext(ConsultationModalContext);
  if (context === undefined) {
    throw new Error("useConsultationModal must be used within a ConsultationModalProvider");
  }
  return context;
}
