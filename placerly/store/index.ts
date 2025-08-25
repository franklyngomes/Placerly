import { StoreState } from '@/types/types'
import { create } from 'zustand'

export const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (value) => set(() => ({user: value}))
}))