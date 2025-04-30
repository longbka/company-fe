import { create } from "zustand";

interface VerifyModalStore {
  isOpen: boolean;
  userEmail: string;
  open: () => void;
  close: () => void;
  setUserMail: (userEmail: string) => void;
}

export const useVerifyModal = create<VerifyModalStore>((set) => ({
  isOpen: false,
  userEmail: "",
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setUserMail: (userEmail) => set({ userEmail }), 
}));