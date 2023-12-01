import { Coin } from "secretjs";

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const truncate = (string: string, maxLength = 12) => {
  if (string.length <= maxLength) return string;

  const first = string.slice(0, Math.floor(maxLength / 2))
  const last = string.slice(string.length - Math.floor(maxLength / 2))
  return `${first}...${last}`
}

export const stringToCoin = (coinAsString: string): Coin => {
  const regexMatch = coinAsString.match(/^(\d+)([a-zA-F0-9\/]+)$/);

  if (regexMatch === null) {
    throw new Error(`cannot extract denom & amount from '${coinAsString}'`);
  }

  return { amount: regexMatch[1], denom: regexMatch[2] };
};


const base64regex =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

export const isBase64 = (str: string) => base64regex.test(str);

export function decodeAll(obj: any) {
  for (const k in obj) {
    // if (!obj.hasOwnProperty(k)) continue;

    if (typeof obj[k] === 'object' && obj[k] !== null) decodeAll(obj[k]);
    if (typeof obj[k] === 'string' && obj[k] !== null) {
      if (k === 'type') continue;
      if (isBase64(obj[k])) obj[k] = atob(obj[k]);
    }
  }
}