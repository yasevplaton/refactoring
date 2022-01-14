import {
  IInvoice,
  IInvoiceStatement,
  IPerformance,
  IEnrichedPerformance,
  IPlay,
  TStatementResultFormat,
} from "./types";
import { playsData } from "./mock";
import { render } from "./view";
import { createPerformanceCalculator } from "./performance-calculator";

function getTotalCreditsVolume(performances: IEnrichedPerformance[]): number {
  return performances.reduce(
    (result: number, perf: IEnrichedPerformance) => result + perf.creditsVolume,
    0
  );
}

function getTotalAmount(performances: IEnrichedPerformance[]): number {
  return performances.reduce(
    (result: number, perf: IEnrichedPerformance) => result + perf.amount,
    0
  );
}

function enrichPerformance(perf: IPerformance): IEnrichedPerformance {
  const play = getPlay(perf.playID);
  const calculator = createPerformanceCalculator(perf, play.type);

  if (!calculator) {
    console.error(`Cannot work with play ${play.toString()}`);
    return {
      ...perf,
      amount: 0,
      creditsVolume: 0,
      playData: play,
    };
  }

  return {
    ...perf,
    amount: calculator.getAmount(),
    creditsVolume: calculator.getCreditsVolume(),
    playData: play,
  };
}

export const getPlay = (playId: string): IPlay => playsData[playId];

export function getStatement(invoice: IInvoice): IInvoiceStatement {
  const { customer, performances } = invoice;
  const enrichedPerformances = performances.map(enrichPerformance);
  return {
    customer: customer,
    performances: enrichedPerformances,
    totalAmount: getTotalAmount(enrichedPerformances),
    creditsVolume: getTotalCreditsVolume(enrichedPerformances),
  };
}

export function statement(
  invoice: IInvoice,
  format?: TStatementResultFormat
): string {
  return render(getStatement(invoice), format);
}
