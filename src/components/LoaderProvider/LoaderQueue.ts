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

  private hasItem(key: string) {
    return this.queue.find((item) => item === key);
  }

  add(key: string) {
    if (!this.isLoaderShown) {
      this.loaderActions.showLoader();
      this.isLoaderShown = true;
    }

    if (!this.hasItem(key)) {
      this.queue.push(key as never);
    }
  }

  remove(key: string): void {
    const currentIdIndex = this.queue.indexOf(key as never);
    if (!this.hasItem(key)) {
      const queueList = this.queue.length ? `Current queue: ${this.queue}` : '';

      console.warn(
        `Trying to remove asset with id '${key}' that does not exist in the loading queue. Check if it has been added. ${queueList}`
      );

      return;
    }

    this.queue.splice(currentIdIndex, 1);

    if (!this.queue.length) {
      this.isLoaderShown = false;
      this.loaderActions.hideLoader();
    }
  }

  getQueue() {
    return this.queue;
  }

  private queue = [];
  private loaderActions: LoaderActions;
  private isLoaderShown: boolean;
}
