import { fireEvent, render, screen } from '@testing-library/react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';
import AccountMenu from './AccountMenu';

jest.mock('@/hooks/useCurrentUser', () => ({
  useCurrentUser: jest.fn(),
}));
jest.mock('next-auth/react', () => ({ signOut: jest.fn() }));

describe('AccountMenu', () => {
  const user = { name: 'John Doe' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render nothing when visible is false', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({ data: null });
    render(<AccountMenu visible={false} />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('should render the menu with the user profile and sign out button when visible is true', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({ data: user });
    const { container } = render(<AccountMenu visible={true} />);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex"
      >
        <div
          class="flex flex-col gap-3"
        >
          <div
            class="px-3 group/items flex flex-grow gap-3 items-center w-full"
          >
            <img
              alt="profiles"
              class="w-8 rounded-md"
              data-nimg="1"
              decoding="async"
              height="32"
              loading="lazy"
              src="/_next/image?url=%2Fimages%2Fdefault-blue.png&w=64&q=75"
              srcset="/_next/image?url=%2Fimages%2Fdefault-blue.png&w=32&q=75 1x, /_next/image?url=%2Fimages%2Fdefault-blue.png&w=64&q=75 2x"
              style="color: transparent;"
              width="32"
            />
            <p
              class="text-white text-sm group-hover/item:underline"
            >
              John Doe
            </p>
          </div>
          <hr
            class="bg-gray-600 border-0 h-px my-4"
          />
          <button
            class="px-3 text-center text-white text-sm hover:underline"
          >
            Sign out
          </button>
        </div>
      </div>
    `);
  });

  it('should call sign out when sign out button is clicked', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({ data: user });
    render(<AccountMenu visible={true} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
