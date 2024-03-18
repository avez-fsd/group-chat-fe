import { create } from 'zustand'

interface UserSearchModal {
    isOpen: boolean,
    users: any[],
    setUsers: (users:any[]) => void,
    onClose: () => void,
    onOpen: () => void,
}
export const useUserSearchModal = create<UserSearchModal>((set) => ({
    isOpen: false,
    users: [],
    setUsers: (users) => set(() => ({ users })),
    onClose: () => set(() => ({ isOpen: false })),
    onOpen: () => set(() => ({ isOpen: true })),
}))