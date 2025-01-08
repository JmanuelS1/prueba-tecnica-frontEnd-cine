"use client";

/**
 * Importaciones necesarias para el layout principal
 * @import Inter - Fuente de Google Fonts
 * @import Provider - Proveedor de Redux para el estado global
 * @import store - Store de Redux
 * @import Navbar - Componente de navegación
 */
import { Inter } from "next/font/google";
import "./global.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Navbar from '@/components/Navbar';

/**
 * Configuración de la fuente Inter de Google
 * @constant inter - Instancia de la fuente Inter con subconjunto latino
 */
const inter = Inter({ subsets: ["latin"] });

/**
 * RootLayout - Componente principal que envuelve toda la aplicación
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que serán renderizados dentro del layout
 * @returns {JSX.Element} Estructura HTML base de la aplicación
 * 
 * @description
 * Este componente representa el layout principal de la aplicación y:
 * - Implementa la directiva "use client" para renderizado en el cliente
 * - Configura el idioma base en inglés
 * - Aplica la fuente Inter a toda la aplicación
 * - Proporciona el store de Redux a todos los componentes
 * - Incluye la barra de navegación global
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}