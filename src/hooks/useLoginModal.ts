/**
 * Importación de Zustand para manejo de estado global
 */
import { create } from 'zustand';

/**
 * Interface que define la estructura del estado del modal de login
 * 
 * @interface LoginModalStore
 * @property {boolean} isOpen - Estado de visibilidad del modal
 * @property {Function} onOpen - Función para abrir el modal
 * @property {Function} onClose - Función para cerrar el modal
 */
interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Hook personalizado para manejar el estado del modal de login
 * 
 * @hook useLoginModal
 * @description
 * Proporciona un store de Zustand para gestionar el estado y las acciones
 * del modal de inicio de sesión.
 * 
 * Funcionalidades:
 * - Control del estado de visibilidad del modal
 * - Métodos para abrir y cerrar el modal
 * - Estado global accesible desde cualquier componente
 * 
 * @example
 * const { isOpen, onOpen, onClose } = useLoginModal();
 * 
 * // Abrir el modal
 * onOpen();
 * 
 * // Cerrar el modal
 * onClose();
 * 
 * // Verificar estado
 * if (isOpen) {
 *   // El modal está abierto
 * }
 */
export const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));