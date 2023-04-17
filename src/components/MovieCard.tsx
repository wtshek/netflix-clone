import { BsFillPlayFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import { FavoriteButton } from './FavoriteButton';
import { useRouter } from 'next/router';
import { useInfoModal } from '@/hooks/useInfoModal';
import { useCallback } from 'react';
import { MovieType } from '@/utils/types';

const ICON_SIZE = 30;

interface MovieCardProps {
  data: MovieType;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();

  const onPlayButtonClick = () => {
    router.push(`/watch/${data?.id}`);
  };

  const handleOpenModalClick = useCallback(() => {
    if (!data?.id) return;
    openModal(data?.id as unknown as string);
  }, [data?.id, openModal]);

  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.thumbnailUrl}
        alt="thumbnail"
        className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
      />
      <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.thumbnailUrl}
          alt="thumbnail"
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={onPlayButtonClick}
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
            >
              <BsFillPlayFill size={ICON_SIZE} />
            </div>
            <FavoriteButton movieId={data?.id} />
            <div
              onClick={handleOpenModalClick}
              className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white rounded-full flex justify-center items-center hover:border-neutral-300 transition"
            >
              <BiChevronDown
                className="text-white group-hover/item:text-neutral-300"
                size={ICON_SIZE}
              />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
