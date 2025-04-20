import { create } from "zustand"

interface RegisterModalStore {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
