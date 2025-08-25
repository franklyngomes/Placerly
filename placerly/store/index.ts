import { StoreState } from '@/types/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      userid: null,
      setUserId: (value) => set(() => ({ userid: value })),
      user: null,
      setUser: (value) => set(() => ({ user: value })),
    }),
    {
      name: 'app-storage', // key in localStorage
      // storage: () => sessionStorage, // uncomment if you prefer session-only persistence
    }
  )
)