import {
  IInvoiceStatement,
  IEnrichedPerformance,
  IRenderFunctions,
  TStatementResultFormat,
} from "./types";
import { usdFormat } from "./helpers";

function renderAsText(data: IInvoiceStatement): string {
  const { customer, performances, totalAmount, creditsVolume } = data;
  return `
  Statement for ${customer}
      ${performances
        .map((perf: IEnrichedPerformance) => {
          return `${perf.playData?.name || perf.playID}: ${usdFormat(
            perf.amount
          )} (${perf.audience} seats)`;
        })
        .join("\n      ")}
  Amount owed is ${usdFormat(totalAmount)}
  You earned ${creditsVolume} credits
  `;
}

function renderAsHTML(data: IInvoiceStatement): string {
  const { customer, performances, totalAmount, creditsVolume } = data;
  return `
  <html>
  Statement for ${customer}
      ${performances
        .map((perf: IEnrichedPerformance) => {
          return `${perf.playData?.name || perf.playID}: ${usdFormat(
            perf.amount
          )} (${perf.audience} seats)`;
        })
        .join("\n      ")}
  Amount owed is ${usdFormat(totalAmount)}
  You earned ${creditsVolume} credits
  </html>
  `;
}

const RENDER_STATEMENT_FUNCTIONS: IRenderFunctions = {
  text: renderAsText,
  html: renderAsHTML,
};

export function render(
  statementData: IInvoiceStatement,
  format?: TStatementResultFormat
): string {
  const renderFunction = format
    ? RENDER_STATEMENT_FUNCTIONS[format]
    : RENDER_STATEMENT_FUNCTIONS.text;
  return renderFunction(statementData);
}
