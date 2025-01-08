import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaPlay } from 'react-icons/fa';

interface TrailerModalProps {
  trailer: { key: string } | null;
}

export function TrailerModal({ trailer }: TrailerModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="w-full mt-4 bg-yellow hover:bg-yellow/80 text-[#343434]"
          disabled={!trailer}
        >
          <FaPlay className="mr-2" /> Play Trailer
        </Button>
      </DialogTrigger>
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
