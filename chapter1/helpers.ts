import { EPlayTypes, TPlayCalculation } from "./types";

const calcTragedyAmount = (audience: number) => {
  let amount = 40000;
  if (audience > 30) {
    amount += 1000 * (audience - 30);
  }
  return amount;
};

const calcComedyAmount = (audience: number) => {
  let amount = 30000;
  if (audience > 20) {
    amount += 10000 + 500 * (audience - 20);
  }
  amount += 300 * audience;
  return amount;
};

const calcComedyCredits = (audience: number) => {
  return Math.floor(audience / 5);
};

export const PLAY_AMOUNT_CALCULATION_FUNCTIONS: Partial<TPlayCalculation> = {
  [EPlayTypes.TRAGEDY]: calcTragedyAmount,
  [EPlayTypes.COMEDY]: calcComedyAmount,
};

export const PLAY_CREDITS_CALCULATION_FUNCTIONS: Partial<TPlayCalculation> = {
  [EPlayTypes.COMEDY]: calcComedyCredits,
};

export const usdFormat = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value / 100);
