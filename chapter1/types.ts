export enum EPlayTypes {
  COMEDY = "comedy",
  TRAGEDY = "tragedy",
}

export interface IPlay {
  name: string;
  type: EPlayTypes;
}

export type TPlayCalculation = {
  [type in EPlayTypes]: (audience: number) => number;
};

export interface IPlaysCollection {
  [playId: string]: IPlay;
}

export interface IPerformance {
  playID: string;
  audience: number;
}

export interface IEnrichedPerformance extends IPerformance {
  amount: number;
  playData: IPlay;
}

export interface IInvoice {
  customer: string;
  performances: IPerformance[];
}

export interface IInvoiceStatement {
  customer: string;
  performances: IEnrichedPerformance[];
  totalAmount: number;
  creditsVolume: number;
}

export type TStatementResultFormat = "text" | "html";

export type IRenderFunctions = {
  [format in TStatementResultFormat]: (data: IInvoiceStatement) => string;
};
