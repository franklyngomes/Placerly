import { StoreState } from '@/types/types'
import { create } from 'zustand'

export const useStore = create<StoreState>((set) => ({
  userid: null,
  setUserId: (value) => set(() => ({userid: value})),
  user: null,
  setUser: (value) => set(() => ({user: value}))
}))