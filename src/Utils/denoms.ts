import BigNumber from "bignumber.js";

type Denom = {
  denom: string;
  decimals: number;
  symbol: string;
}

export const Denoms: Denom[] = [
  {
    denom: 'uscrt',
    decimals: 6,
    symbol: 'SCRT',
  }
]

export const findDenom = (denom: string) => {
  let known = Denoms.find(d=>d.denom === denom)
  return known;
}

export const denomToHuman = (amount: number | string, decimals: number) => {
  console.log('Converting', amount, 'to human with', decimals, 'decimals!')
    amount = parseInt(amount.toString());
    const humanAmount = amount / Math.pow(10, decimals)
    return humanAmount;
}

export const humanToDenom = (amount: number | string, decimals: number): string => {
    amount = parseFloat(amount.toString());
    const result = amount * Math.pow(10, decimals)
    const denomAmount = BigNumber(result)
    return denomAmount.toFixed();
}