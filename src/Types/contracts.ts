import { TokenInfo } from "./snip20";

export type ContractInfo = {
  address: string;
  codeId: string;
  codeHash: string;
  label: string;
  friendlyName: string;
  tokenInfo?: TokenInfo;
  // shadeSwapPair?: ShadeGetPairInfo;
  shadeSwapPair?: PairInfo;
}

export type PairInfo = {
  lp_token: string;
  tokens: string[];
}