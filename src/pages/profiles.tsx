import { useCallback } from 'react';
import { NextPageContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Paths } from '@/utils/types';
import { PROFILE_WIDTH, PROFILE_HEIGHT } from '@/utils/constant';

const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  const onProfileClick = useCallback(() => {
    router.push(Paths.Home);
  }, []);
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={onProfileClick}>
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <Image
                  src="/images/default-blue.png"
                  alt="Profile"
                  width={PROFILE_WIDTH}
                  height={PROFILE_HEIGHT}
                />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
