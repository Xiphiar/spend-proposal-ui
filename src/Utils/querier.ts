import { ArrayLog, SecretNetworkClient } from "secretjs";

export const querierJs = new SecretNetworkClient({
  url: process.env.REACT_APP_LCD_URL,
  chainId:  process.env.REACT_APP_CHAIN_ID,
});

type DataCache = {
  isCached: boolean;
  data?: any;
}

const getCache = (key: string): DataCache => {
  const fromStorage = localStorage.getItem(key);
  if (fromStorage) try {
    const parsed: DataCache = JSON.parse(fromStorage);
    if (!parsed.isCached) throw new Error();

    return parsed;
  } catch (e: any) {
    console.error('Removing cache key', key, 'for', e.toString())
    localStorage.removeItem(key);
  }
  return {isCached: false, data: undefined};
}

const setCache = (key: string, data: any) => {
  const cache: DataCache = {
    isCached: true,
    data: data,
  }

  localStorage.setItem(key, JSON.stringify(cache));
}

export const getTokenInfo = async (contract_address: string) => {
  const key = `token_info-${contract_address}`;

  const fromCache = getCache(key);
  if (fromCache.isCached) {
    // console.log('Using cache result for', key, fromCache)
    return fromCache.data;
  }

  try {
    const result: string | any = await querierJs.query.compute.queryContract({
      contract_address,
      query: {
        token_info: {}
      }
    });
    if (typeof(result) === 'string') throw result;

    setCache(key, result.token_info)
    return result.token_info;
  } catch(err: any) {
    setCache(key, undefined)
    return undefined;
  }
};

export const queryWithCache = async (contract_address: string, queryName: string) => {
  const key = `${queryName}-${contract_address}`;

  const fromCache = getCache(key);
  if (fromCache.isCached) {
    console.log('Using cache result for', key, fromCache)
    return fromCache.data;
  }

  try {
    const query = {};
    //@ts-ignore
    query[queryName] = {}
    console.log(query)
    const result: string | any = await querierJs.query.compute.queryContract({
      contract_address,
      query
    });
    console.log(queryName, ' result', result)
    if (typeof(result) === 'string') throw result;

    setCache(key, result[queryName])
    return result[queryName];
  } catch(err: any) {
    setCache(key, undefined)
    return undefined;
  }
};

export const getExchangeRate = async (contract_address: string) => {
  const key = `exchange_rate-${contract_address}`;

  const fromStorage = localStorage.getItem(key);
  if (fromStorage) return JSON.parse(fromStorage);

  const {exchange_rate} = await querierJs.query.compute.queryContract({
    contract_address,
    query: {
      exchange_rate: {}
    }
  }) as {exchange_rate: {rate: number, denom: string}};

  localStorage.setItem(key, JSON.stringify(exchange_rate));
  return exchange_rate;
};

export const getContractInfo = async (contract_address: string) => {
  try {
    const key = `contract_info-${contract_address}`;

    const fromStorage = localStorage.getItem(key);
    if (fromStorage) return JSON.parse(fromStorage);

    const { contract_info } = await querierJs.query.compute.contractInfo({
      contract_address,
    });

    localStorage.setItem(key, JSON.stringify(contract_info));
    return contract_info;
  } catch(e: any) {
    if (e.message.includes('not found')) return undefined;
    else console.error('Failed to get contract info for ', e);
  }
};

export const getSiennaPairInfo = async (contract_address: string) => {
  const key = `sienna_pair_info-${contract_address}`;

  const fromStorage = localStorage.getItem(key);
  if (fromStorage) return JSON.parse(fromStorage);

  const {pair_info} = await querierJs.query.compute.queryContract({
    contract_address,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    query: 'pair_info', // whyy sienna :(
  }) as any;

  localStorage.setItem(key, JSON.stringify(pair_info));
  return pair_info;
};

export const findWasmLog = (arrayLog: ArrayLog = [], key: string) => {
  return (arrayLog || []).find(log=> log.type==='wasm' && log.key===key)?.value;
}

export const findLog = (arrayLog: ArrayLog = [], type: string, key: string) => {
  return (arrayLog || []).find(log=> log.type===type && log.key===key)?.value;
}