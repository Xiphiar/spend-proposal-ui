export type Snip20HandleMsg =
  | {
      redeem: {
        amount: Uint128
        denom?: string | null
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      deposit: {
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      transfer: {
        amount: Uint128
        memo?: string | null
        padding?: string | null
        recipient: HumanAddr
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      send: {
        amount: Uint128
        memo?: string | null
        msg?: Binary | null
        padding?: string | null
        recipient: HumanAddr
        recipient_code_hash?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      batch_transfer: {
        actions: TransferAction[]
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      batch_send: {
        actions: SendAction[]
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      burn: {
        amount: Uint128
        memo?: string | null
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      register_receive: {
        code_hash: string
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      create_viewing_key: {
        entropy: string
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      set_viewing_key: {
        key: string
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      increase_allowance: {
        amount: Uint128
        expiration?: number | null
        padding?: string | null
        spender: HumanAddr
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      decrease_allowance: {
        amount: Uint128
        expiration?: number | null
        padding?: string | null
        spender: HumanAddr
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      transfer_from: {
        amount: Uint128
        memo?: string | null
        owner: HumanAddr
        padding?: string | null
        recipient: HumanAddr
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      send_from: {
        amount: Uint128
        memo?: string | null
        msg?: Binary | null
        owner: HumanAddr
        padding?: string | null
        recipient: HumanAddr
        recipient_code_hash?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      batch_transfer_from: {
        actions: TransferFromAction[]
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      batch_send_from: {
        actions: SendFromAction[]
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      burn_from: {
        amount: Uint128
        memo?: string | null
        owner: HumanAddr
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      batch_burn_from: {
        actions: BurnFromAction[]
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      mint: {
        amount: Uint128
        memo?: string | null
        padding?: string | null
        recipient: HumanAddr
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      batch_mint: {
        actions: MintAction[]
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      add_minters: {
        minters: HumanAddr[]
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      remove_minters: {
        minters: HumanAddr[]
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      set_minters: {
        minters: HumanAddr[]
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      change_admin: {
        address: HumanAddr
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      set_contract_status: {
        level: ContractStatusLevel
        padding?: string | null
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | {
      revoke_permit: {
        permit_name: string
        [k: string]: unknown
      }
      [k: string]: unknown
    }
export type Uint128 = string
export type HumanAddr = string
/**
 * Binary is a wrapper around Vec<u8> to add base64 de/serialization with serde. It also adds some helper methods to help encode inline.
 *
 * This is only needed as serde-json-{core,wasm} has a horrible encoding for Vec<u8>
 */
export type Binary = string
export type ContractStatusLevel =
  | "normal_run"
  | "stop_all_but_redeems"
  | "stop_all"

export interface TransferAction {
  amount: Uint128
  memo?: string | null
  recipient: HumanAddr
  [k: string]: unknown
}
export interface SendAction {
  amount: Uint128
  memo?: string | null
  msg?: Binary | null
  recipient: HumanAddr
  recipient_code_hash?: string | null
  [k: string]: unknown
}
export interface TransferFromAction {
  amount: Uint128
  memo?: string | null
  owner: HumanAddr
  recipient: HumanAddr
  [k: string]: unknown
}
export interface SendFromAction {
  amount: Uint128
  memo?: string | null
  msg?: Binary | null
  owner: HumanAddr
  recipient: HumanAddr
  recipient_code_hash?: string | null
  [k: string]: unknown
}
export interface BurnFromAction {
  amount: Uint128
  memo?: string | null
  owner: HumanAddr
  [k: string]: unknown
}
export interface MintAction {
  amount: Uint128
  memo?: string | null
  recipient: HumanAddr
  [k: string]: unknown
}

export type TokenInfoResponse = {
  token_info: TokenInfo
}


export type TokenInfo = {
  name: string
  symbol: string
  decimals: number
  total_supply: string | null
}