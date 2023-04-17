import { render } from '@testing-library/react';
import { MovieList } from '@/components/MovieList';
import { MovieType } from '@/utils/types';

describe('MovieList component', () => {
  const movies: MovieType[] = [
    {
      id: '1',
      title: 'Movie 1',
      description: 'Description for Movie 1',
      videoUrl: 'http://example.com/movie1.mp4',
      thumbnailUrl: 'http://example.com/movie1.jpg',
      genre: 'Action',
      duration: '1h 30m',
    },
  ];

  it('should render a list of movie cards', () => {
    const { container } = render(
      <MovieList data={movies} title="Featured Movies" />
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="px-4 md:px-12 mt-4 space-y-8"
      >
        <div>
          <p
            class="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4"
          >
            Featured Movies
          </p>
          <div
            class="grid grid-cols-4 gap-2"
          >
            <div
              class="group bg-zinc-900 col-span relative h-[12vw]"
            >
              <img
                alt="thumbnail"
                class="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
                src="http://example.com/movie1.jpg"
              />
              <div
                class="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100"
              >
                <img
                  alt="thumbnail"
                  class="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
                  src="http://example.com/movie1.jpg"
                />
                <div
                  class="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md"
                >
                  <div
                    class="flex flex-row items-center gap-3"
                  >
                    <div
                      class="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                      data-testid="play-button"
                    >
                      <svg
                        fill="currentColor"
                        height="30"
                        stroke="currentColor"
                        stroke-width="0"
                        viewBox="0 0 16 16"
                        width="30"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                        />
                      </svg>
                    </div>
                    <button
                      class="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-2 border-white rounded-full flex justify-center items-center transition hover:border-neutral-300"
                    >
                      <svg
                        class="text-white"
                        fill="currentColor"
                        height="25"
                        stroke="currentColor"
                        stroke-width="0"
                        t="1551322312294"
                        version="1.1"
                        viewBox="0 0 1024 1024"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs />
                        <path
                          d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"
                        />
                        <path
                          d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"
                        />
                      </svg>
                    </button>
                    <div
                      class="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white rounded-full flex justify-center items-center hover:border-neutral-300 transition"
                    >
                      <svg
                        class="text-white group-hover/item:text-neutral-300"
                        fill="currentColor"
                        height="30"
                        stroke="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        width="30"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p
                    class="text-green-400 font-semibold mt-4"
                  >
                    New 
                    <span
                      class="text-white"
                    >
                      2023
                    </span>
                  </p>
                  <div
                    class="flex flex-row mt-4 gap-2 items-center"
                  >
                    <p
                      class="text-white text-[10px] lg:text-sm"
                    >
                      1h 30m
                    </p>
                  </div>
                  <div
                    class="flex flex-row mt-4 gap-2 items-center"
                  >
                    <p
                      class="text-white text-[10px] lg:text-sm"
                    >
                      Action
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it('should not render anything if there are no movies', () => {
    const { container } = render(
      <MovieList data={[]} title="Featured Movies" />
    );
    expect(container.firstChild).toBeNull();
  });
});
