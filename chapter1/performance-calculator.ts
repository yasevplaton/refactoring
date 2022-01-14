import { EPlayTypes, IPerformance } from "./types";

export interface IPerformanceCalculator {
  getAmount: () => number;
  getCreditsVolume: () => number;
}

abstract class PerformanceCalculator implements IPerformanceCalculator {
  performance: IPerformance;

  constructor(performance: IPerformance) {
    this.performance = performance;
  }

  abstract getAmount(): number;

  getCreditsVolume() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class ComedyCalculator extends PerformanceCalculator {
  getAmount() {
    const { audience } = this.performance;
    let amount = 30000;
    if (audience > 20) {
      amount += 10000 + 500 * (audience - 20);
    }
    amount += 300 * audience;
    return amount;
  }

  getCreditsVolume() {
    return super.getCreditsVolume() + Math.floor(this.performance.audience / 5);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  getAmount() {
    const { audience } = this.performance;
    let amount = 40000;
    if (audience > 30) {
      amount += 1000 * (audience - 30);
    }
    return amount;
  }
}

export function createPerformanceCalculator(
  performance: IPerformance,
  playType: EPlayTypes
): IPerformanceCalculator | null {
  switch (playType) {
    case EPlayTypes.COMEDY:
      return new ComedyCalculator(performance);
    case EPlayTypes.TRAGEDY:
      return new TragedyCalculator(performance);
    default:
      return null;
  }
}
