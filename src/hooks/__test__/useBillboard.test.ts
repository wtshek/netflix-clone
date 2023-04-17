import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { act } from '@testing-library/react';
import { useBillboard } from '@/hooks/useBillboard';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('swr');

describe('useBillboard', () => {
  const mockData = {
    title: 'Mock Billboard',
    image: '/images/mock-billboard.png',
  };

  beforeAll(() => {
    (useSWR as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });
  });

  it('should return data, error, and isLoading from useSWR', () => {
    act(() => {
      const { result } = renderHook(() => useBillboard());
      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBeNull();
      expect(result.current.isLoading).toBeFalsy();
    });
  });

  it('should call useSWR with the correct arguments', () => {
    act(() => {
      renderHook(() => useBillboard());
    });

    expect(useSWR).toHaveBeenCalledWith('/api/random', fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });
  });
});
