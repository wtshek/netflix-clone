import { createContext, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { LoaderQueue } from './LoaderQueue';

interface LoaderProviderProps {
  children: JSX.Element | string;
}

const SPINNER_ICON_SIZE = 80;

interface LoaderContextInterface {
  isLoaderShown: boolean;
  addToLoaderQueue: (key: string) => void;
  removeFromLoaderQueue: (key: string) => void;
  loaderQueue: string[];
}

export const LoaderContext = createContext<LoaderContextInterface | undefined>(
  undefined
);

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [isLoaderShown, setIsLoaderShown] = useState(false);
  const loaderAction = {
    showLoader: () => setIsLoaderShown(true),
    hideLoader: () => setIsLoaderShown(false),
  };
  const queue = new LoaderQueue(loaderAction);

  return (
    <LoaderContext.Provider
      value={{
        loaderQueue: queue.getQueue(),
        addToLoaderQueue: queue.add,
        removeFromLoaderQueue: queue.remove,
        isLoaderShown: isLoaderShown,
      }}
    >
      <div>
        {children}
        <div
          className={`${
            isLoaderShown ? 'visible' : 'invisible'
          } absolute top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-black`}
        >
          <ImSpinner2
            className="text-[#E50914] animate-spin"
            size={SPINNER_ICON_SIZE}
          />
        </div>
      </div>
    </LoaderContext.Provider>
  );
};
