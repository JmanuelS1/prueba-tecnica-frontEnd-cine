import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Interface para las propiedades del Input
 * Extiende todas las propiedades nativas del elemento input HTML
 *
 * @interface InputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Componente Input personalizado
 *
 * @component
 * @description
 * Un componente de entrada de texto reutilizable con estilos predefinidos y estados interactivos.
 * Soporta todos los atributos nativos de input HTML y permite personalización mediante className.
 *
 * Características:
 * - Estilos base consistentes
 * - Estados de focus y disabled
 * - Soporte para archivos
 * - Personalizable mediante className
 * - Accesible
 *
 * @example
 * // Input básico
 * <Input type="text" placeholder="Escribe algo..." />
 *
 * // Input con clase personalizada
 * <Input className="custom-class" type="email" />
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {string} [props.type] - Tipo de input (text, email, password, etc.)
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Estilos base
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          // Estilos para el manejo de archivos
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          // Estados interactivos
          "ring-offset-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // Estados deshabilitados
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Estilos del placeholder
          "placeholder:text-muted-foreground",
          // Clases personalizadas
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

// Nombre para DevTools
Input.displayName = "Input";

export { Input };
