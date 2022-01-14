import {
  IInvoiceStatement,
  IEnrichedPerformance,
  TStatementResultFormat,
} from "./types";
import { usdFormat } from "./helpers";

interface IRenderer {
  render(): string;
}

abstract class Renderer implements IRenderer {
  data: IInvoiceStatement;

  constructor(data: IInvoiceStatement) {
    this.data = data;
  }

  abstract render(): string;
}

class TextRenderer extends Renderer {
  render() {
    const { customer, performances, totalAmount, creditsVolume } = this.data;
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
  render() {
    const { customer, performances, totalAmount, creditsVolume } = this.data;
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

function createRenderer(
  data: IInvoiceStatement,
  format?: TStatementResultFormat
): IRenderer {
  switch (format) {
    case "html":
      return new HtmlRenderer(data);
    case "text":
    default:
      return new TextRenderer(data);
  }
}

export function render(
  statementData: IInvoiceStatement,
  format?: TStatementResultFormat
): string {
  const renderer = createRenderer(statementData, format);
  return renderer.render();
}
