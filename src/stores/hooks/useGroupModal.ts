import { create } from 'zustand'

interface GroupModal {
    isOpen: boolean,
    onClose: () => void,
    onOpen: () => void,
}

export const useGroupModal = create<GroupModal>((set) => ({
    isOpen: false,
    onClose: () => set(() => ({ isOpen: false })),
    onOpen: () => set(() => ({ isOpen: true })),
}))