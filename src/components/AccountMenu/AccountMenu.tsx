import { useCurrentUser } from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

interface AccountMenuProps {
  visible: boolean;
}

const PROFILE_PIC_WIDTH = 32;
const PROFILE_PIC_HEIGHT = 32;

export const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();
  const onLogoutClick = () => signOut();

  if (!visible) return null;
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/items flex flex-grow gap-3 items-center w-full">
          <Image
            src="/images/default-blue.png"
            alt="profiles"
            className="w-8 rounded-md"
            width={PROFILE_PIC_WIDTH}
            height={PROFILE_PIC_HEIGHT}
          />
          <p className="text-white text-sm group-hover/item:underline">
            {currentUser?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <button
          onClick={onLogoutClick}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};
export default AccountMenu;
