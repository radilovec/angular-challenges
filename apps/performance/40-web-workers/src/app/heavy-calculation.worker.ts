/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  randomHeavyCalculationFunction(data);
});

const randomHeavyCalculationFunction = (to: number) => {
  const finalLength = 664579;
  let curr = 0;

  for (let num = 2; num <= to; num++) {
    let randomFlag = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        randomFlag = false;
        break;
      }
    }
    if (randomFlag) {
      curr++;
      postMessage((curr * 100) / finalLength);
    }
  }
};
