export interface LoaderActions {
  showLoader: () => void;
  hideLoader: () => void;
}

export class LoaderQueue {
  constructor(loaderAction: LoaderActions) {
    this.queue = [];
    this.loaderActions = loaderAction;
    this.isLoaderShown = false;
  }

  add(key: string) {
    console.log(key);
    if (!this.isLoaderShown) {
      this.loaderActions.showLoader();
      console.log('calling loader');
      this.isLoaderShown = true;
    }

    if (!this.queue.indexOf(key)) {
      this.queue.push(key);
    }
  }

  remove(key: string): void {
    const currentIdIndex = this.queue.indexOf(key);
    if (!!currentIdIndex) {
      const queueList = this.queue.length ? `Current queue: ${this.queue}` : '';

      console.warn(
        `Trying to remove asset with id '${key}' that does not exist in the loading queue. Check if it has been added. ${queueList}`
      );

      return;
    }

    this.queue.splice(currentIdIndex, 1);

    if (!this.queue.length) {
      this.isLoaderShown = false;
      console.log('removing loader');
      this.loaderActions.hideLoader();
    }
  }

  getQueue() {
    return this.queue;
  }

  private queue: string[];
  private loaderActions: LoaderActions;
  private isLoaderShown: boolean;
}
