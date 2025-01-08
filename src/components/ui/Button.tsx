import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

/**
 * Interface que extiende las propiedades HTML nativas del botón
 *
 * @interface ButtonProps
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>}
 * @property {('default' | 'outline' | 'ghost')} [variant] - Variante visual del botón
 * @property {('sm' | 'md' | 'lg')} [size] - Tamaño del botón
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

/**
 * Componente Button reutilizable
 *
 * @component
 * @description
 * Botón personalizable que soporta diferentes variantes y tamaños.
 * Utiliza forwardRef para permitir el paso de referencias.
 *
 * @example
 * // Botón por defecto
 * <Button>Click me</Button>
 *
 * // Botón outline pequeño
 * <Button variant="outline" size="sm">Small Button</Button>
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {('default' | 'outline' | 'ghost')} [props.variant='default'] - Estilo visual del botón
 * @param {('sm' | 'md' | 'lg')} [props.size='md'] - Tamaño del botón
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          // Estilos base
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          // Variantes y tamaños
          {
            // Variantes de estilo
            "bg-primary text-primary-foreground shadow hover:bg-primary/90":
              variant === "default",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
              variant === "outline",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            // Tamaños
            "h-8 px-3 text-sm": size === "sm",
            "h-9 px-4 text-sm": size === "md",
            "h-10 px-6 text-base": size === "lg",
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

// Nombre para DevTools
Button.displayName = "Button";

export { Button };
