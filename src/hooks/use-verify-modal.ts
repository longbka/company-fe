import { create } from "zustand"

interface VerifyModalStore {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useVerifyModal = create<VerifyModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
