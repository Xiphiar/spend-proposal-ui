export type ShadeRouterAmmPair = {
  pair: [
    {
      custom_token: {
        contract_addr: string
        token_code_hash: string
      }
    },
    {
      custom_token: {
        contract_addr: string
        token_code_hash: string
      }
    },
    boolean
  ]
  address: string
  code_hash: string
  enabled: boolean
}

export type GetShadeRouterPairsResponse = {
  list_a_m_m_pairs: {
    amm_pairs: Array<ShadeRouterAmmPair>
  }
}

export type GetShadePairInfoResponse = {
  get_pair_info: ShadeGetPairInfo
}

export type ShadeGetPairInfo = {
  liquidity_token: {
    address: string
    code_hash: string
  }
  factory: {
    address: string
    code_hash: string
  }
  pair: [
    {
      custom_token: {
        contract_addr: string
        token_code_hash: string
      }
    },
    {
      custom_token: {
        contract_addr: string
        token_code_hash: string
      }
    },
    boolean
  ]
  amount_0: string
  amount_1: string
  total_liquidity: string
  contract_version: number
  fee_info: {
    shade_dao_address: string
    lp_fee: {
      nom: number
      denom: number
    }
    shade_dao_fee: {
      nom: number
      denom: number
    }
    stable_lp_fee: {
      nom: number
      denom: number
    }
    stable_shade_dao_fee: {
      nom: number
      denom: number
    }
  }
  stable_info: any
}
