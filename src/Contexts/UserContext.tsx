import {
  createContext,
  useState,
  useContext,
  ReactElement,
  ReactNode
} from 'react';
import { toast } from 'react-toastify';

import { sleep } from '../Utils';
import { SecretNetworkClient } from 'secretjs';

interface Props {
  children: ReactNode;
}

export interface CurrentWallet {
  key_name: string;
  client:  SecretNetworkClient;
  address: string;
}

export interface UserContextState {
  user: CurrentWallet | undefined;
  connecting: boolean;
  connectWallet: (()=>Promise<void>)
}

const whatever = async() => {}

// created context with no default values
const UserContext = createContext<UserContextState>({
  user: undefined,
  connecting: false,
  connectWallet: whatever,
});

export const UserProvider = ({ children }: Props): ReactElement => {
  const [user, setUser] = useState<CurrentWallet>();
  const [connecting, setConnecting] = useState<boolean>(false);

  window.addEventListener("keplr_keystorechange", () => {
    console.log("Keplr wallet changed!");
    onChangeWallet();
  })

  window.addEventListener("leap_keystorechange", () => {
    console.log("Leap wallet changed!");
    onChangeWallet();
  })

  window.addEventListener("cosmostation_keystorechange", () => {
    console.log("Cosmostation wallet changed!");
    onChangeWallet();
  })

  const onChangeWallet = async () => {
    if (!window.keplr) return;

    const keyResult = await window.keplr.getKey(process.env.REACT_APP_CHAIN_ID)
    console.log('New Address', keyResult.bech32Address)
    console.log('Current Address', user?.address);
  }

  const connectWallet = async () => {
    try {
      setConnecting(true);

      let tries = 0
      while (
        tries > 3 && 
        !window.keplr
      ) {
        tries++
        await sleep(50);
      };

      if (!window.keplr) throw new Error('Keplr Wallet Not Found')

      const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
      await window.keplr.enable(CHAIN_ID);

      const keplrOfflineSigner = window.keplr.getOfflineSignerOnlyAmino(CHAIN_ID);
      const [{ address }] = await keplrOfflineSigner.getAccounts();
      const { name: key_name } = await window.keplr.getKey(CHAIN_ID)

      const client = new SecretNetworkClient({
        url: process.env.REACT_APP_LCD_URL,
        chainId: CHAIN_ID,
        wallet: keplrOfflineSigner,
        walletAddress: address,
      });

      setUser({
        address,
        key_name,
        client,
      })
      
    } catch(error: any) {
      toast.error(error.toString())
      console.error(error)
    } finally {
      setConnecting(false);
    }
  }

  const values: UserContextState = {
    user,
    connecting,
    connectWallet,
  };

  // add values to provider to reach them out from another component
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

// created custom hook
export const useUser = (): UserContextState => useContext(UserContext);