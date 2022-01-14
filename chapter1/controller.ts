import { IInvoice, TStatementResultFormat } from "./types";
import { render } from "./view";
import { getStatement } from "./model";

export function statement(
  invoice: IInvoice,
  format?: TStatementResultFormat
): string {
  return render(getStatement(invoice), format);
}
