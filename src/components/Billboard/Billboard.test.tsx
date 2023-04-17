import { render, screen, fireEvent } from '@testing-library/react';
import { useBillboard } from '@/hooks/useBillboard';
import { Billboard } from './Billboard';
import { useInfoModal } from '@/hooks/useInfoModal';

jest.mock('@/hooks/useBillboard');
jest.mock('@/hooks/useInfoModal', () => ({
  useInfoModal: jest.fn().mockReturnValue({
    movieId: undefined,
    isOpen: false,
    openModal: jest.fn(),
  }),
}));

describe('Billboard', () => {
  const data = {
    id: '123',
    title: 'My Awesome Movie',
    description: 'A movie that is awesome',
    videoUrl: 'https://example.com/movie.mp4',
    thumbnailUrl: 'https://example.com/thumbnail.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useBillboard as jest.Mock).mockReturnValue({ data });
  });

  it('should render the component with the correct data', async () => {
    render(<Billboard />);
    expect(screen.getByText(data.title)).toBeInTheDocument();
    expect(screen.getByText('More Info')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();

    const video = screen.getByTestId('video');
    expect(video).toHaveAttribute('src', 'https://example.com/movie.mp4');
    expect(video).toHaveAttribute(
      'poster',
      'https://example.com/thumbnail.jpg'
    );
  });

  it('should call useInfoModal hook when "More Info" button is clicked', () => {
    const { openModal } = useInfoModal();
    render(<Billboard />);
    const moreInfoButton = screen.getByRole('button', { name: /More Info/i });
    fireEvent.click(moreInfoButton);
    expect(openModal).toHaveBeenCalledTimes(1);
    expect(openModal).toHaveBeenCalledWith('123');
  });
});
