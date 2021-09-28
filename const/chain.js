import * as Fee from '@/const/fee'

export const NETWORKS = [
  {
    value: 1,
    name: 'Creator Chain',
    chainId: [],
    symbol: 'CTR',
    fee: Fee.CTR_FEE,
    isDisabled: true
  },
  {
    value: 2,
    name: 'Ethereum',
    chainId: ['0x1', '0x4'],
    symbol: 'ETH',
    fee: Fee.ETH_FEE,
    isDisabled: false
  },
  {
    value: 3,
    name: 'Kardia Chain',
    chainId: [],
    fee: {},
    isDisabled: true
  },
  {
    value: 4,
    name: 'Binance SmartChain',
    chainId: ['0x61'],
    symbol: 'BNB',
    fee: Fee.BSC_FEE,
    isDisabled: false
  },
]

export const CHAIN_ID = {
    Ethereum: '0x1',
    Ropsten: '0x3',
    Rinkeby: '0x4',
    Goerli: '0x5',
    Kovan: '0x2a',
};

export const SERVICE_TYPE_ERC= {
  default: 1,
  mintable: 2,
  burnable: 3,
  mintableBurnable: 4,
}
