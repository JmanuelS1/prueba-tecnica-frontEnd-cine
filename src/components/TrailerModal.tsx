/**
 * Importaciones necesarias para el componente TrailerModal
 */
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { FaPlay } from "react-icons/fa";

/**
 * Interface para las propiedades del TrailerModal
 *
 * @interface TrailerModalProps
 * @property {Object | null} trailer - Objeto que contiene la información del trailer
 * @property {string} trailer.key - Identificador único del video de YouTube
 */
interface TrailerModalProps {
  trailer: { key: string } | null;
}

/**
 * Componente TrailerModal
 *
 * @component
 * @description
 * Modal que muestra el trailer de una película.
 * Características:
 * - Botón de reproducción que se deshabilita si no hay trailer disponible
 * - Integración con YouTube mediante iframe
 * - Diseño responsive con tamaño máximo definido
 * - Animaciones y transiciones suaves
 *
 * @param {TrailerModalProps} props - Propiedades del componente
 * @returns {JSX.Element} Modal con el reproductor de video
 */
export function TrailerModal({ trailer }: TrailerModalProps) {
  return (
    <Dialog>
      {/* Botón para abrir el modal */}
      <DialogTrigger asChild>
        <Button
          className="w-full mt-4 bg-yellow hover:bg-yellow/80 text-[#343434]"
          disabled={!trailer}
        >
          <FaPlay className="mr-2" /> Play Trailer
        </Button>
      </DialogTrigger>
      {/* Contenido del modal */}
      <DialogContent className="max-w-3xl">
        {trailer && (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </DialogContent>
    </Dialog>
  );
}
