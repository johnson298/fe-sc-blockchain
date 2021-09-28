export const CONTRACT_FACTORY_20 = {
  rinkeby: {
    chainId: '0x4',
    contractAddress: '0x093B38c795654ea5cD8e7Df874f123dA23298882',
    contractAbi: require("@/assets/abi/erc20.json"),
    contractUrl: 'https://rinkeby.etherscan.io/address/',
    transactionUrl: 'https://rinkeby.etherscan.io/tx/',
  },
  binance: {
    chainId: '0x61',
    contractAddress: '0x73416D2563A66Ad816e2cf58453AFb0146d09ECc',
    contractAbi: require("@/assets/abi/erc20.json"),
    contractUrl: 'https://testnet.bscscan.com/address/',
    transactionUrl: 'https://testnet.bscscan.com/tx/',
  },
}

export const CONTRACT_FACTORY_223 = {
    rinkeby: {
        chainId: '0x4',
        contractAddress: '0x74A4ef900fFbF9D8A7E44CbD6359a914D84a0ca6',
        contractAbi: require("@/assets/abi/erc223/factory.json"),
        contractUrl: 'https://rinkeby.etherscan.io/address/',
        transactionUrl: 'https://rinkeby.etherscan.io/tx/',
    },
    binance: {
        chainId: '0x61',
        contractAddress: '0x722aabB7dAA9C2F946cF5e7A4adD32CE226590a9',
        contractAbi: require("@/assets/abi/erc223/factory.json"),
        contractUrl: 'https://testnet.bscscan.com/address/',
        transactionUrl: 'https://testnet.bscscan.com/tx/',
    },
}

export const CONTRACT_FACTORY_777 = {
    rinkeby: {
        chainId: '0x4',
        contractAddress: '0xB3cF266EC9dA55FC385faD4F5db3b2533F943939',
        contractAbi: require("@/assets/abi/erc777/factory.json"),
        contractUrl: 'https://rinkeby.etherscan.io/address/',
        transactionUrl: 'https://rinkeby.etherscan.io/tx/',
    },
    binance: {
        chainId: '0x61',
        contractAddress: '',
        contractAbi: require("@/assets/abi/erc777/factory.json"),
        contractUrl: 'https://testnet.bscscan.com/address/',
        transactionUrl: 'https://testnet.bscscan.com/tx/',
    },
}

export const CONTRACT_FACTORY_721 = {
  rinkeby: {
    chainId: '0x4',
    contractAddress: '0x0eAF978899d7CB8ff3E5dd8aB72a32bDC0606e2f',
    contractAbi: require("@/assets/abi/erc721/factory.json"),
    contractUrl: 'https://rinkeby.etherscan.io/address/',
    transactionUrl: 'https://rinkeby.etherscan.io/tx/',
  },
  binance: {
    chainId: '0x61',
    contractAddress: '0xB3A2511232D1C531Dca22aa6761bD875dfD5BEfE',
    contractAbi: require("@/assets/abi/erc721/factory.json"),
    contractUrl: 'https://testnet.bscscan.com/address/',
    transactionUrl: 'https://testnet.bscscan.com/tx/',
  },
}

export const CONTRACT_FACTORY_1155 = {
  rinkeby: {
    chainId: '0x4',
    contractAddress: '0x733650002665ffB5c5710B6C6dA4e6d01c8137e2',
    contractAbi: require("@/assets/abi/erc1155/factory.json"),
    contractUrl: 'https://rinkeby.etherscan.io/address/',
    transactionUrl: 'https://rinkeby.etherscan.io/tx/',
  },
  binance: {
    chainId: '0x61',
    contractAddress: '0x0e53cC6bb5DEc5b1ED45f4D87a874EdCb0A77487',
    contractAbi: require("@/assets/abi/erc1155/factory.json"),
    contractUrl: 'https://testnet.bscscan.com/address/',
    transactionUrl: 'https://testnet.bscscan.com/tx/',
  },
}

export default [
    {
        path: 'erc20',
        address: CONTRACT_FACTORY_20
    },
    {
        path: 'erc223',
        address: CONTRACT_FACTORY_223
    },
    {
        path: 'erc777',
        address: CONTRACT_FACTORY_777
    },
    {
        path: 'erc721',
        address: CONTRACT_FACTORY_721
    },
    {
      path: 'erc1155',
      address: CONTRACT_FACTORY_1155
    },
]

