import { render } from '@testing-library/react';
import { PlayButton } from './PlayButton';

describe('PlayButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    const { container } = render(<PlayButton movieId="123" />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition"
        >
          <svg
            class="mr-1"
            fill="currentColor"
            height="25"
            stroke="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
            />
          </svg>
           Play
        </button>
      </div>
    `);
  });
});
