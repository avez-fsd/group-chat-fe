import { create } from 'zustand'
import { GroupData } from './useChat'

interface MenuState {
    isOpen: boolean
    groups: GroupData[],
    toggleIsOpen: () => void,
    closeSideMenu: () => void,
    setGroups: (groups:any) => void,
    setGroup: (group:any) => void,
}
export const useSideMenu = create<MenuState>((set) => ({
    groups: [],
    isOpen: true,
    setGroups: (groups) => set(() => ({ groups})),
    setGroup: (group: any) => set((state) => ({ groups: [group, ...state.groups]})),
    closeSideMenu: () => set(() => ({ isOpen: false})),
    toggleIsOpen: () => set((state:any) => ({ isOpen: !state.isOpen }))
}))