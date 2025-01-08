/**
 * Importaciones necesarias para la utilidad de clases CSS
 */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utilidad para combinar clases CSS de manera eficiente
 * 
 * @function cn
 * @description
 * Combina múltiples clases CSS utilizando clsx y tailwind-merge.
 * - Resuelve conflictos entre clases de Tailwind
 * - Permite el uso de condicionales
 * - Mantiene el orden correcto de especificidad
 * - Elimina clases duplicadas o conflictivas
 * 
 * @param {...ClassValue[]} inputs - Lista de clases CSS, objetos o arrays de clases
 * @returns {string} Cadena de clases CSS optimizada y combinada
 * 
 * @example
 * // Uso básico
 * cn('text-red-500', 'bg-blue-200');
 * 
 * // Con condicionales
 * cn('base-class', {
 *   'active-class': isActive,
 *   'disabled-class': isDisabled
 * });
 * 
 * // Con clases de Tailwind que podrían conflictuar
 * cn('px-2 py-1', 'p-4'); // Resolverá el conflicto de padding
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}