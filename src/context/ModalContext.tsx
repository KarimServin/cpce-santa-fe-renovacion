'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isOpen: boolean;
  dialogKind: string | null;
  openDialog: (kind: string) => void;
  closeDialog: () => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogKind, setDialogKind] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

  const openDialog = (kind: string) => {
    setDialogKind(kind);
    setIsOpen(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
    setDialogKind(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimer) clearTimeout(toastTimer);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    setToastTimer(timer);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        dialogKind,
        openDialog,
        closeDialog,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
