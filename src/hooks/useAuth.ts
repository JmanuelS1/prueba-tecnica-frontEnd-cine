/**
 * Importación de Zustand para manejo de estado global
 */
import { create } from "zustand";

/**
 * Interface que define la estructura del estado de autenticación
 *
 * @interface AuthState
 * @property {boolean} isAuthenticated - Indica si el usuario está autenticado
 * @property {boolean} isOpen - Controla la visibilidad del modal de login
 * @property {Function} toggleLoginModal - Alterna la visibilidad del modal
 * @property {Function} closeModal - Cierra el modal de login
 * @property {Function} login - Maneja el proceso de autenticación
 * @property {Function} logout - Cierra la sesión del usuario
 */
interface AuthState {
  isAuthenticated: boolean;
  isOpen: boolean;
  toggleLoginModal: () => void;
  closeModal: () => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

/**
 * Hook personalizado para manejar la autenticación
 *
 * @hook useAuth
 * @description
 * Proporciona un store de Zustand para gestionar el estado de autenticación y sus operaciones.
 *
 * Funcionalidades:
 * - Control del estado de autenticación
 * - Manejo del modal de login
 * - Autenticación simulada con credenciales predefinidas
 * - Cierre de sesión
 *
 * Credenciales de prueba:
 * - Email: test@gmail.com
 * - Password: pass
 *
 * @example
 * const { isAuthenticated, login, logout, toggleLoginModal } = useAuth();
 *
 * // Abrir/cerrar modal
 * toggleLoginModal();
 *
 * // Iniciar sesión
 * await login({ email: 'test@gmail.com', password: 'pass' });
 *
 * // Cerrar sesión
 * logout();
 */
export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  isOpen: false,
  toggleLoginModal: () => set((state) => ({ isOpen: !state.isOpen })),
  closeModal: () => set({ isOpen: false }),
  login: async (credentials) => {
    // Simulación de autenticación
    if (
      credentials.email === "test@gmail.com" &&
      credentials.password === "pass"
    ) {
      set({ isAuthenticated: true, isOpen: false });
    } else {
      alert("Credenciales incorrectas");
    }
  },
  logout: () => set({ isAuthenticated: false }),
}));
