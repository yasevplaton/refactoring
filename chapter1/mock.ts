import { EPlayTypes, IInvoice, IPlaysCollection } from "./types";

export const playsData: IPlaysCollection = {
  hamlet: {
    name: "Hamlet",
    type: EPlayTypes.TRAGEDY,
  },
  "as-like": {
    name: "As You Like It",
    type: EPlayTypes.COMEDY,
  },
  othello: {
    name: "Othello",
    type: EPlayTypes.TRAGEDY,
  },
};

export const invoiceData: IInvoice = {
  customer: "BigCo",
  performances: [
    {
      playID: "hamlet",
      audience: 55,
    },
    {
      playID: "as-like",
      audience: 35,
    },
    {
      playID: "othello",
      audience: 40,
    },
  ],
};
