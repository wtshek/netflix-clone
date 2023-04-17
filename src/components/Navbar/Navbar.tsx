import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs';
import { LOGO_WIDTH, LOGO_HEIGHT } from '@/utils/constant';
import { PROFILE_WIDTH, PROFILE_HEIGHT } from '@/utils/constant';
import { NavbarItem } from '@/components/NavbarItem';
import { MobileMenu } from '@/components/MobileMenu';
import { AccountMenu } from '@/components/AccountMenu';

const TOP_OFFSET = 66;

const navbarItems = [
  'Home',
  'Series',
  'Films',
  'New & Popular',
  'My List',
  'Browse by languages',
];

export const Navbar: React.FC = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isAccountMenuShown, setIsAccountMenuShown] = useState(false);
  const [isNavbarBackgroundShown, setIsNavbarBackgroundShown] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuVisible((curr) => !curr);
  }, []);
  const toggleAccountMenu = useCallback(() => {
    setIsAccountMenuShown((curr) => !curr);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarBackgroundShown(window.scrollY >= TOP_OFFSET);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500  ${
          isNavbarBackgroundShown ? 'bg-zinc-900 bg-opacity-90' : ''
        }`}
      >
        <Image
          src="/images/logo.png"
          alt="logo"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          {navbarItems.map((item) => (
            <NavbarItem key={item} label={item} />
          ))}
        </div>
        <div className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm" onClick={toggleMobileMenu}>
            Browse
          </p>
          <BsChevronDown
            className={`text-white transition ${
              isMobileMenuVisible ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={isMobileMenuVisible} items={navbarItems} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image
                src="/images/default-blue.png"
                alt="Profile"
                width={PROFILE_WIDTH}
                height={PROFILE_HEIGHT}
              />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                isAccountMenuShown ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visible={isAccountMenuShown} />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
