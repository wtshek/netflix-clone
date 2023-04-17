import { render, screen, fireEvent, act } from '@testing-library/react';
import { InfoModal } from './InfoModal';
import { useInfoModal } from '@/hooks/useInfoModal';
import { useMovie } from '@/hooks/useMovie';
jest.mock('@/hooks/useInfoModal');
jest.mock('@/hooks/useMovie');

describe('InfoModal component', () => {
  const onCloseMock = jest.fn();
  const mockMovieData = {
    id: '1',
    title: 'Movie Title',
    duration: '2h 10m',
    genre: 'Action',
    description: 'Movie description',
    thumbnailUrl: 'https://thumbnail-url.com',
    videoUrl: 'https://video-url.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useInfoModal as any).mockReturnValue({ movieId: '1' });
    (useMovie as jest.Mock).mockReturnValue({ data: mockMovieData });
  });

  test('renders correctly with visible true', () => {
    const { container } = render(
      <InfoModal visible={true} onClose={onCloseMock} />
    );

    expect(screen.getByText(mockMovieData.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovieData.duration)).toBeInTheDocument();
    expect(screen.getByText(mockMovieData.genre)).toBeInTheDocument();
    expect(screen.getByText(mockMovieData.description)).toBeInTheDocument();
    expect(container.querySelector('video')).toHaveAttribute(
      'src',
      mockMovieData.videoUrl
    );
  });

  test('renders nothing with visible false', () => {
    const { container } = render(
      <InfoModal visible={false} onClose={onCloseMock} />
    );

    expect(container.firstChild).toBeNull();
  });

  test('onClose callback is called when close icon is clicked', () => {
    const onCloseMock = jest.fn();
    jest.useFakeTimers();
    const { getByTestId } = render(
      <InfoModal visible={true} onClose={onCloseMock} />
    );
    const closeIcon = getByTestId('close-icon');

    fireEvent.click(closeIcon);
    act(() => {
      jest.runAllTimers();
    });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
