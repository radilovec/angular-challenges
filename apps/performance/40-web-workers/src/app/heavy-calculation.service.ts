import { Injectable, signal } from '@angular/core';

@Injectable()
export class HeavyCalculationService {
  private worker: Worker | undefined = undefined;

  constructor() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(
        new URL('./heavy-calculation.worker', import.meta.url),
      );

      this.worker.onmessage = ({ data }) => {
        this.loadingPercentage.set(data.toFixed(2));
      };
    } else {
      console.error(`Web Workers are not supported in this environment.`);
    }
  }

  loadingPercentage = signal(0);

  startLoading() {
    this.worker?.postMessage(10000000);
  }
}
