import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

interface PlayButtonProps {
  movieId: string;
}

const PLAY_BUTTON_ICON_SIZE = 25;

export const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push(`/watch/${movieId}`);
  }, [movieId, router]);
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition"
    >
      <BsFillPlayFill size={PLAY_BUTTON_ICON_SIZE} className="mr-1" /> Play
    </button>
  );
};
