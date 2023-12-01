import { Coin } from "secretjs";

export type MatchMessage = ExecuteMsg | BankTransferMessage | IbcTransferMsg

export type AnyMsg = {
  '@type': string;
}

export type ExecuteMsg = {
  '@type': '/secret.compute.v1beta1.MsgExecuteContract';
  sender: string;
  contract: string;
  msg: any;
  callback_code_hash: string;
  sent_funds: Coin[];
  callback_sig: any;
}

export type IbcTransferMsg = {
  '@type': '/ibc.applications.transfer.v1.MsgTransfer'
  source_port: string
  source_channel: string
  token: {
    denom: string
    amount: string
  }
  sender: string
  receiver: string
  timeout_height: {
    revision_number: string
    revision_height: string
  }
  timeout_timestamp: string
  memo: string
}

export type BankTransferMessage = {
  '@type': '/cosmos.bank.v1beta1.MsgSend'
  from_address: string
  to_address: string
  amount: Coin[];
}
