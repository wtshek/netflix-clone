import { render, fireEvent, screen } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useFavorites } from '@/hooks/useFavorites';
import { FavoriteButton } from './FavoriteButton';

jest.mock('@/hooks/useCurrentUser');
jest.mock('@/hooks/useFavorites');

describe('FavoriteButton', () => {
  test('renders correctly when movie is not a favorite', () => {
    const currentUser = { favoriteIds: [] };
    (useCurrentUser as jest.Mock).mockReturnValue({
      data: currentUser,
      mutate: jest.fn(),
    });
    (useFavorites as jest.Mock).mockReturnValue({ mutate: jest.fn() });

    render(<FavoriteButton movieId="1" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/favorite', {
      movieId: '1',
    });
  });

  test('renders correctly when movie is a favorite', () => {
    const currentUser = { favoriteIds: ['1'] };
    (useCurrentUser as jest.Mock).mockReturnValue({
      data: currentUser,
      mutate: jest.fn(),
    });
    (useFavorites as jest.Mock).mockReturnValue({ mutate: jest.fn() });

    render(<FavoriteButton movieId="1" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockAxios.delete).toHaveBeenCalledWith('/api/favorite', {
      data: { movieId: '1' },
    });
  });
});
