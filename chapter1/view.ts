import {
  IInvoiceStatement,
  IEnrichedPerformance,
  TStatementResultFormat,
} from "./types";
import { usdFormat } from "./helpers";

interface IRenderer {
  render(data: IInvoiceStatement): string;
}

abstract class Renderer implements IRenderer {
  abstract render(data: IInvoiceStatement): string;
}

class TextRenderer extends Renderer {
  render(data: IInvoiceStatement) {
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
}

class HtmlRenderer extends Renderer {
  render(data: IInvoiceStatement) {
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
}

function createRenderer(format?: TStatementResultFormat): IRenderer {
  switch (format) {
    case "html":
      return new HtmlRenderer();
    case "text":
    default:
      return new TextRenderer();
  }
}

export function render(
  statementData: IInvoiceStatement,
  format?: TStatementResultFormat
): string {
  const renderer = createRenderer(format);
  return renderer.render(statementData);
}
