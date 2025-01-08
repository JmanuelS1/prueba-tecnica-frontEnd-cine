import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  isOpen: boolean
  toggleLoginModal: () => void
  closeModal: () => void
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  isOpen: false,
  toggleLoginModal: () => set((state) => ({ isOpen: !state.isOpen })),
  closeModal: () => set({ isOpen: false }),
  login: async (credentials) => {
    // Simulación de autenticación
    if (credentials.email === 'test@gmail.com' && credentials.password === 'pass') {
      set({ isAuthenticated: true, isOpen: false })
    } else {
      alert('Credenciales incorrectas')
    }
  },
  logout: () => set({ isAuthenticated: false }),
}))