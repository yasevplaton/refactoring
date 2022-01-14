import {
  IInvoice,
  IInvoiceStatement,
  IPerformance,
  IEnrichedPerformance,
  IPlay,
  TStatementResultFormat,
} from "./types";
import {
  PLAY_AMOUNT_CALCULATION_FUNCTIONS,
  PLAY_CREDITS_CALCULATION_FUNCTIONS,
} from "./helpers";
import { playsData } from "./mock";
import { render } from "./view";

function getTotalCreditsVolume(performances: IPerformance[]): number {
  return performances.reduce(
    (result: number, perf: IPerformance) => result + calcVolumeCredits(perf),
    0
  );
}

function getTotalAmount(performances: IPerformance[]): number {
  return performances.reduce(
    (result: number, perf: IPerformance) =>
      result + calcPerformanceAmount(perf),
    0
  );
}

function getEnrichedPerformances(
  performances: IPerformance[]
): IEnrichedPerformance[] {
  return performances.map((perf: IPerformance) => {
    return {
      ...perf,
      amount: calcPerformanceAmount(perf),
      playData: getPlay(perf.playID),
    };
  });
}

function calcPerformanceAmount(performance: IPerformance): number {
  const play = getPlay(performance.playID);
  if (!play) {
    console.error(`Cannot find play with id ${performance.playID}`);
    return 0;
  }

  const calcAmountFunc = PLAY_AMOUNT_CALCULATION_FUNCTIONS[play.type];
  return calcAmountFunc ? calcAmountFunc(performance.audience) : 0;
}

function calcVolumeCredits(performance: IPerformance): number {
  const play = getPlay(performance.playID);

  if (!play) {
    console.error(`Cannot find play with id ${performance.playID}`);
    return 0;
  }

  let res = 0;
  res += Math.max(performance.audience - 30, 0);

  const calcAdditionalCredits = PLAY_CREDITS_CALCULATION_FUNCTIONS[play.type];

  if (calcAdditionalCredits) {
    res += calcAdditionalCredits(performance.audience);
  }

  return res;
}

export const getPlay = (playId: string): IPlay => playsData[playId];

export function getStatement(invoice: IInvoice): IInvoiceStatement {
  const { customer, performances } = invoice;
  return {
    customer: customer,
    performances: getEnrichedPerformances(performances),
    totalAmount: getTotalAmount(performances),
    creditsVolume: getTotalCreditsVolume(performances),
  };
}

export function statement(
  invoice: IInvoice,
  format?: TStatementResultFormat
): string {
  return render(getStatement(invoice), format);
}
